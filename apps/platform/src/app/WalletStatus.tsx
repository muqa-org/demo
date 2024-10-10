'use client';

import { ReactNode } from 'react';
import { useAccount, useConnect } from 'wagmi';

function Datum({ title, value, children }: {
  title: string;
  value?: string;
  children?: ReactNode
}) {
  return (
    <div>
       <span className="font-semibold text-sm mr-2">{title}</span>
       {value ? <span className="text-xs">{value}</span> : children!}
    </div>
  );
}

const isHidden = process.env.NEXT_PUBLIC_SHOW_WALLET_STATUS !== 'true';

export function WalletStatus() {
  if (isHidden) return null;

  const { connectors, connect } = useConnect()

	const account = useAccount();


  return (
    <div className="fixed top-30 left-0 w-auto h-auto px-4 py-2 opacity-80 bg-white border-gray-200">
      <Datum title="STATUS" value={account?.status} />
      <Datum title="CONNECTOR" value={account?.connector?.name} />
      <Datum title="CHAIN" value={account?.chain?.name} />
      <Datum title="AVAILABLE CONNECTORS">
      <ul>
          {connectors.map((connector) => (
            <li key={connector.uid} className="text-xs">
              <button key={connector.uid} onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            </li>
            )) ?? []}
        </ul>
      </Datum>
      <Datum title="CONNECTED ADDRESSES">
        <ul>
          {account?.addresses?.map((address) => (
            <li key={address} className="text-xs">{address}</li>
            )) ?? []}
        </ul>
      </Datum>
    </div>
  );
}
