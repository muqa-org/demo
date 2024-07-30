'use client';

import { useAccount } from 'wagmi';

export function WalletStatus() {
  const account = useAccount();

  return (
    <div className="fixed top-30 left-0 w-auto h-16 px-4 py-2 bg-white border-t border-gray-200">
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
