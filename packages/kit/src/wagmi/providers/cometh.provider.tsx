'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Config, createConfig, WagmiProvider } from 'wagmi';

import { comethConfig } from '../../config';

const wagmiConfig = createConfig(comethConfig.wagmi);

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
