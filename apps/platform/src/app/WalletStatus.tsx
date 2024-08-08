'use client';

import { useEffect } from 'react';
import { http, useAccount, useConnectorClient, useConnect, useWalletClient, useConnections, useClient } from 'wagmi';
import { getConnectorClient } from 'wagmi/actions'
import { avalancheFuji } from 'wagmi/chains';

export function WalletStatus() {
  const account = useAccount();
  const client = useClient();
  const connectorClient = useConnectorClient();
  const walletClient = useWalletClient();
  let result = 'No result';
  const connections = useConnections();

  // useEffect(() => {
  //   // Add your code here to run on component mount or when account changes
  //   // For example, you can fetch data or perform any side effects
  //   console.log('Component mounted or account changed');
  //   const fetchData = async () => {
  //     // if (account && account.connector) {
  //     //   const [acc] = await account.connector.getAccounts();
  //     //   console.log('acc', acc);
  //     // }
  //   };
  //   fetchData();
  // }, [account]);

  console.log('account', account);
  console.log('client', client);
  console.log('connectorClient', connectorClient);
  console.log('walletClient', walletClient);
  console.log('connections', connections);

  if ((account?.connector as any)?.getComethWallet) {
    console.log('account.connector', account.connector);
    const connector: any = account.connector;
    connector.getComethWallet().then((wallet: any) => {
      console.log('wallet', wallet);
    });
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <span className="font-semibold mr-2">STATUS</span>
        <span className="text-xs">{account?.status}</span>
      </div>
      <div>
        <span className="font-semibold mr-2">CONNECTOR</span>
        <span className="text-xs">{account?.connector?.name}</span>
      </div>
      <div>
        <span className="font-semibold mr-2">CHAIN</span>
        <span className="text-xs">{account?.chain?.name}</span>
      </div>
      <div>
        <span className="font-semibold mr-2">RESULT</span>
        <span className="text-xs">{result}</span>
      </div>
      <div>
        <span className="font-semibold mr-2">CONNECTED ADDRESSES</span>
        <ul>
          {account?.addresses?.map((address) => (
            <li key={address} className="text-xs">{address}</li>
            )) ?? []}
        </ul>
      </div>
    </div>
  );
}
