import { TToken } from '@gitcoin/gitcoin-chain-data';
import { Hex, WalletClient } from 'viem';

import { getErc20Data } from './getErc20Data';

type SignPermitProps = {
  walletClient: WalletClient;

  // Token to be spent
  token: TToken

  // Address of the spender
  spenderAddress: Hex;

  // Expiration date of the permit
  deadline: bigint;

  // Chain ID
  chainId: number;

  // Optional version of the permit
  permitVersion?: string;
};

type Eip2612Props = SignPermitProps & {
  // Amount of tokens to be spent
  value: bigint;
};

export const signPermit2612 = async ({
  walletClient,
  token,
  spenderAddress,
  value,
  deadline,
  chainId,
  permitVersion,
}: Eip2612Props) => {
  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const ownerAddress = walletClient.account!.address!;
  const { tokenName, tokenAddress, nonce } = await getErc20Data(token, walletClient);

  const signature = await walletClient.signTypedData({
    account: ownerAddress,
    message: {
      owner: ownerAddress,
      spender: spenderAddress,
      value,
      nonce,
      deadline,
    },
    domain: {
      name: tokenName,
      version: permitVersion ?? '1',
      chainId: chainId,
      verifyingContract: tokenAddress,
    },
    primaryType: 'Permit',
    types,
  });

  const permit = {
    deadline,
    nonce,
    permitted: {
      token: tokenAddress,
      amount: value,
    },
  };

  return { signature, permit }
};
