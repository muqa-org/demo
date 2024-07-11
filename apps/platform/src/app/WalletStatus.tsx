'use client';

import { useAccount } from 'wagmi';

export function WalletStatus() {
  const { addresses, chain, connector, status } = useAccount();

  return (
    <div className="max-w-screen-lg mx-auto">
      <p>Status: {status}</p>
      <p>Connector: {connector?.name}</p>
      <p>Chain: {chain?.name}</p>
      <div>
        <p>Connected addresses: </p>
        <ul>
          {addresses?.map((address) => (
            <li key={address}>{address}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
