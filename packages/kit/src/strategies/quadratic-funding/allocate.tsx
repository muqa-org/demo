import { DonationVotingMerkleDistributionStrategy } from '@allo-team/allo-v2-sdk';
import { getAddress } from '@allo-team/allo-v2-sdk/dist/Allo/allo.config';
import { Allocation, Permit2Data, PermitType } from '@allo-team/allo-v2-sdk/dist/strategies/DonationVotingMerkleDistributionStrategy/types';
import { TToken } from '@gitcoin/gitcoin-chain-data';
import { Chain, WalletClient } from 'viem';

import { signPermit2612 } from './utils/signPermit2612';
import { API, Round } from '../../api/types';

type CartAllocation = {
  recipientAddress: `0x${string}`,
  amount: number,
};

export const call = async (
  round: Round,
  api: Pick<API, 'sendTransaction'>,
  signer: WalletClient,
  token: TToken,
  cartAllocation: CartAllocation

) => {
  // TODO: check rpc url
  const strategy = new DonationVotingMerkleDistributionStrategy({
    chain: round.chainId,
    rpc: signer.chain?.rpcUrls.default.http[0],
    address: getAddress({ id: round.chainId } as Chain),
    poolId: BigInt(round.id),
  });

  const permit = await getPermit2Data(signer, round, token, cartAllocation);

  const allocation: Allocation = {
    recipientId: cartAllocation.recipientAddress,
    permitType: PermitType.Permit,
    permit2Data: permit,
  }

  const tx = strategy.getAllocateData(allocation);

  return api.sendTransaction(tx, signer);
};

async function getPermit2Data(
  walletClient: WalletClient,
  round: Round,
  token: TToken,
  cartAllocation: CartAllocation): Promise<Permit2Data>
{
  const deadline = round.phases.roundEnd
    ? new Date(round.phases.roundEnd).getTime()
    : Date.now() + 30 * 60 * 1000; // 30 minutes

  const spenderAddress = round.strategy;

  const { signature, permit } = await signPermit2612({
    walletClient,
    token,
    spenderAddress,
    value: BigInt(cartAllocation.amount),
    deadline: BigInt(deadline),
    chainId: round.chainId
  })

  return { signature, permit };
}
