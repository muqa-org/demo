'use client';
import { TransactionData } from '@allo-team/allo-v2-sdk';
import { ComethProvider, ComethWallet } from '@cometh/connect-sdk';
import { getConnectViemAccount } from '@cometh/connect-sdk-viem';
import { TToken } from '@gitcoin/gitcoin-chain-data';
import { parseUnits, WalletClient } from 'viem';

import { CartAllocation } from './qf.types';
import { getTokenMetadata } from './utils/getTokenMetadata';
import { generateAllocateTransaction, generateApprovalTransaction } from './utils/payload';
import { API, Round } from '../../api/types';

export const call = async (
  round: Round,
  token: TToken,
  cartAllocation: CartAllocation,
  account: any,
  signer: WalletClient,
) => {
  const comethWallet: ComethWallet = await (account.connector as any).getComethWallet();
  signer!.account = getConnectViemAccount(comethWallet);

  const tokenMetadata = await getTokenMetadata(token, signer);
  const amount = parseUnits(cartAllocation.amount.toString(), tokenMetadata.decimals);

  const approvalTxData = await generateApprovalTransaction(
    tokenMetadata,
    round.strategy,
    amount
  );
  const allocateTxData = await generateAllocateTransaction(
    tokenMetadata,
    round,
    cartAllocation.recipientAddress,
    amount);

  return approveAndSendTransaction(comethWallet, [approvalTxData, allocateTxData]);
};

async function approveAndSendTransaction(comethWallet: ComethWallet, txData: TransactionData[]) {
  const logNamespace = 'approveAndSendTransaction';
  const provider = new ComethProvider(comethWallet!);

  const safeTx = await comethWallet!.sendBatchTransactions(txData);
  console.log(`${logNamespace} safeTx`, safeTx);

  const txPending = await provider.getTransaction(safeTx.safeTxHash, safeTx.relayId);
  console.log(`${logNamespace} txPending`, txPending);

  const txReceipt = await txPending.wait();
  console.log(`${logNamespace} txReceipt`, txReceipt);
}
