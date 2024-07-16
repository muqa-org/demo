'use client';

import { useAccount } from 'wagmi';

export function WalletStatus() {
  const account = useAccount();

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
