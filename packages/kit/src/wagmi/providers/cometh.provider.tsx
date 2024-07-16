'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { polygonAmoy } from 'viem/chains';
import { Config, createConfig, http, WagmiProvider } from 'wagmi';

const wagmiConfig = createConfig({
  chains: [
    polygonAmoy
  ],
  ssr: true,
  transports: {
    [polygonAmoy.id]: http()
  }
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
