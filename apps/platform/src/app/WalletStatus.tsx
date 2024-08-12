'use client';

import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

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

export function WalletStatus() {
	const account = useAccount();

  return (
    <div className="fixed top-20 left-0 w-auto h-auto px-4 py-2 opacity-50 bg-white border-gray-200">
      <Datum title="STATUS" value={account?.status} />
      <Datum title="CONNECTOR" value={account?.connector?.name} />
      <Datum title="CHAIN" value={account?.chain?.name} />
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
