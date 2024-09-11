import { TToken } from '@gitcoin/gitcoin-chain-data';
import { getContract, parseAbi, WalletClient } from 'viem';

export const getErc20Data = async (token: TToken, walletClient: WalletClient) => {
  const erc20Contract = getContract({
    address: token.address,
    abi: parseAbi([
      'function nonces(address) public view returns (uint256)',
      'function name() public view returns (string)',
    ]),
    client: walletClient,
  });

  const owner = walletClient!.account!.address!;
  const nonce = await erc20Contract.read.nonces([owner]);
  const tokenName = await erc20Contract.read.name();

  return {
    tokenName,
    tokenAddress: token.address,
    nonce,
  }
};
