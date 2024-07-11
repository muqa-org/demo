"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { PropsWithChildren } from "react";
import { Config, createConfig, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { baseSepolia, polygonAmoy } from 'viem/chains';

const wagmiConfig = createConfig({
  chains: [
    polygonAmoy
  ],
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
