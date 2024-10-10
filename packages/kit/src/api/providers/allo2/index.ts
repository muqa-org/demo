import { Allo, Registry } from '@allo-team/allo-v2-sdk/';
import { abi as AlloABI } from '@allo-team/allo-v2-sdk/dist/Allo/allo.config';
import { ComethProvider, ComethWallet } from '@cometh/connect-sdk';
import { getConnectViemAccount } from '@cometh/connect-sdk-viem';
import {
  PublicClient,
  encodePacked,
  getAddress,
  publicActions,
  keccak256,
  zeroAddress,
  WalletClient,
  encodeAbiParameters,
  parseAbiParameters,
} from 'viem';
import { decodeEventLog, type Address, type Chain } from 'viem';

import { API } from '../../types';

const createAlloOpts = (chain: Chain) => ({
  chain: chain.id,
  rpc: chain.rpcUrls.default.http[0],
});
function getProfileId(address: Address): Address {
  return keccak256(encodePacked(['uint256', 'address'], [BigInt(0), address]));
}

export const alloNativeToken: Address =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const allo2API: Partial<API> = {
  createRound: async function (data, signer: WalletClient, account) {
    try {
      let comethWallet: ComethWallet;
      if (account?.connector) {
        comethWallet = await account.connector.getComethWallet();
        const connectViemAccount = getConnectViemAccount(comethWallet);
        signer.account = connectViemAccount;
      }

      if (!signer?.account) throw new Error('Signer missing');

      const allo = new Allo(createAlloOpts(signer.chain!));

      const client = signer.extend(publicActions);
      // Annoying that a profile must be created to deploy a pool
      const profileId = await getOrCreateProfile(signer, comethWallet!);

      const {
        amount = BigInt(0),
        metadata,
        strategy,
        token,
        managers = [],
        initStrategyData = '0x',
      } = data;
      if (typeof initStrategyData !== 'string')
        throw new Error('initStrategyData must be a bytes string.');

      const txData = allo.createPool({
        profileId,
        strategy,
        // Set token address to native token if empty or zero address
        token: !token || token === zeroAddress ? alloNativeToken : token,
        managers,
        amount,
        metadata,
        initStrategyData,
      });
      console.log('txData', txData);

      const provider = new ComethProvider(comethWallet!);

      const safeTx = await comethWallet!.sendTransaction(txData);
      console.log('safeTx', safeTx);

      const txPending = await provider.getTransaction(safeTx.safeTxHash, safeTx.relayId);
      console.log('txPending', txPending);

      const txReceipt = await txPending.wait();
      console.log('txReceipt', txReceipt);

      // Wait for PoolCreated event and return poolId
      return createLogDecoder(AlloABI, client)((safeTx.safeTxHash as Address)!, ['PoolCreated']).then(
        (logs) => {
          const id = String((logs?.[0]?.args as { poolId: bigint }).poolId);
          return { id, chainId: signer.chain?.id as number };
        },
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createApplication: async function (data, signer) {
    try {
      if (!signer?.account) throw new Error('Signer missing');
      const allo = new Allo(createAlloOpts(signer.chain!));

      const client = signer.extend(publicActions);

      const { roundId, strategyData = '0x' } = data;

      const tx = allo.registerRecipient(roundId, strategyData);

      const hash = await this.sendTransaction?.(tx, signer);

      // Wait for PoolCreated event and return poolId
      return createLogDecoder(AlloABI, client)(hash!, [
        'UpdatedRegistration',
      ]).then((logs) => {
        const id = String(
          (logs?.[0]?.args as { recipientId: Address }).recipientId,
        );
        return { id, chainId: signer.chain?.id as number };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createProject: async function (data, signer) {
    try {
      if (!signer?.account) throw new Error('Signer missing');
      const address = getAddress(signer.account?.address);
      const allo = new Allo(createAlloOpts(signer.chain!));

      const client = signer.extend(publicActions);

      const { name, description } = data;

      const chainId = signer.chain?.id as number;
      throw new Error('Create Project not implemented yet');
      return { id: 'id', chainId };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  allocate: async function (tx, signer) {
    try {
      return await this.sendTransaction?.(tx, signer);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  distribute: () => {},
};

async function getOrCreateProfile(signer: WalletClient, wallet: ComethWallet) {
  const registry = new Registry(createAlloOpts(signer.chain!));
  const address = getAddress(signer.account?.address!);
  return registry
    ?.getProfileById(getProfileId(signer.account?.address!))
    .then(async (profile) => {
      if (profile?.anchor === zeroAddress) {
        return profile.id;
      }

      const txData = registry.createProfile({
        nonce: BigInt(0),
        members: [address],
        owner: address,
        metadata: { protocol: BigInt(1), pointer: '' },
        name: '',
      });
      console.log('txData', txData);

      const provider = new ComethProvider(wallet);

      const safeTx = await wallet.sendTransaction(txData);
      console.log('safeTx', safeTx);

      const txPending = await provider.getTransaction(safeTx.safeTxHash, safeTx.relayId);
      console.log('txPending', txPending);

      const txReceipt = await txPending.wait();
      console.log('txReceipt', txReceipt);

      // This will not work with built in Cometh getTransaction because it
      // only checks for ExecutionSuccess event, and we need a specific event to
      // get things like profile id from the ProfileCreated event
      return createLogDecoder(AlloABI, signer.extend(publicActions))(safeTx.safeTxHash as Address, [
        'ProfileCreated',
      ]).then(
        (logs) => (logs?.[0]?.args as { profileId: Address })?.profileId,
      );
  });
}

function createLogDecoder(
  abi: readonly unknown[],
  client?: {
    waitForTransactionReceipt: PublicClient['waitForTransactionReceipt'];
  },
) {
  return async (hash: Address, events: string[]) =>
    client?.waitForTransactionReceipt({ hash }).then(({ logs }) => {
      return logs
        .map(({ data, topics }) => {
          try {
            const decoded = decodeEventLog({ abi, data, topics });
            return events.includes(decoded.eventName) ? decoded : null;
          } catch (error) {
            return null;
          }
        })
        .filter(Boolean);
    });
}

export const encoders = {
  directGrants: encodeDirectGrantsLiteData,
};

function encodeDirectGrantsLiteData(data: {
  registrationStartTime: string;
  registrationEndTime: string;
}) {
  return encodeAbiParameters(
    parseAbiParameters([
      'InitializeData data',
      'struct InitializeData { bool useRegistryAnchor; bool metadataRequired; uint64 registrationStartTime; uint64 registrationEndTime; }',
    ]),
    [
      {
        useRegistryAnchor: false,
        metadataRequired: true,
        registrationStartTime: dateToUint64(
          new Date(data.registrationStartTime),
        ),
        registrationEndTime: dateToUint64(new Date(data.registrationEndTime)),
      },
    ],
  );
}

export function dateToUint64(date: Date) {
  return BigInt(Math.round(Number(date) / 1000));
}
