'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Config, State, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

export function ComethProvider({
  children,
  config,
  initialState
}: PropsWithChildren<{ config: Config, initialState?: State }>) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
