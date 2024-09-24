'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { arbitrumSepolia } from 'viem/chains';
import { Config, createConfig, http, WagmiProvider } from 'wagmi';

import { comethConnector } from '..';

const wagmiConfig = createConfig({
  chains: [
    arbitrumSepolia
  ],

  transports: {
    // [arbitrumSepolia.id]: http()
    [arbitrumSepolia.id]: http('https://virtual.arbitrum-sepolia.rpc.tenderly.co/bd5d0ce2-fccd-45aa-b5a1-41ee94d12875')
  },
  connectors: [comethConnector],
})

const queryClient = new QueryClient();

export function ComethProvider({
  children
}: PropsWithChildren<{ config?: Config }>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
