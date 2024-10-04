import { ComethWallet } from '@cometh/connect-sdk';
import { getConnectViemAccount } from '@cometh/connect-sdk-viem';
import { useState, useEffect } from 'react';
import { WalletClient } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';

import { ComethConnector } from '../config';

export function useCometh() {
  const account = useAccount();
  const connector = account.connector as ComethConnector;
  const { data: walletClient } = useWalletClient();

  const [comethClient, setComethClient] = useState<WalletClient | null>();
  const [comethWallet, setComethWallet] = useState<ComethWallet | null>();

  useEffect(() => {
    async function createComethClient() {
      if (!walletClient) return;

      if (account.isConnected && connector) {
        const wallet = await connector.getComethWallet();
        const comethAccount = getConnectViemAccount(wallet);

        setComethWallet(wallet);
        setComethClient({
          ...walletClient,
          account: comethAccount,
        });
      } else {
        setComethClient(walletClient);
      }
    }

    createComethClient();
  }, [account.isConnected, connector]);

  return { client: comethClient, wallet: comethWallet, connector };
}
