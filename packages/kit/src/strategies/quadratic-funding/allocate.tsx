'use client';
import { TransactionData } from '@allo-team/allo-v2-sdk';
import { ComethProvider, ComethWallet } from '@cometh/connect-sdk';
import { TToken } from '@gitcoin/gitcoin-chain-data';
import { parseUnits } from 'viem';

import { CartAllocation } from './qf.types';
import { generateAllocateTransaction, generateApprovalTransaction } from './utils/payload';
import { Round } from '../../api/types';

export const call = async (
  round: Round,
  token: TToken,
  cartAllocation: CartAllocation,
  wallet: ComethWallet,
) => {
  const amount = parseUnits(cartAllocation.amount.toString(), token.decimals);

  const approvalTxData = await generateApprovalTransaction(
    round.strategy,
    token.address,
    amount
  );
  const allocateTxData = await generateAllocateTransaction(
    round,
    cartAllocation.recipientAddress,
    amount);

  return approveAndSendTransaction(wallet, [approvalTxData, allocateTxData]);
};

async function approveAndSendTransaction(wallet: ComethWallet, txData: TransactionData[]) {
  const logNamespace = 'approveAndSendTransaction';
  const provider = new ComethProvider(wallet!);

  const safeTx = await wallet!.sendBatchTransactions(txData);
  console.log(`${logNamespace} safeTx`, safeTx);

  const txPending = await provider.getTransaction(safeTx.safeTxHash, safeTx.relayId);
  console.log(`${logNamespace} txPending`, txPending);

  const txReceipt = await txPending.wait();
  console.log(`${logNamespace} txReceipt`, txReceipt);
}
