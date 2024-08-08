'use client';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { comethConnectConnector } from '@cometh/connect-sdk-viem'

const COMETH_API_KEY = process.env.NEXT_PUBLIC_COMETH_API_KEY!

export const comethConnector = comethConnectConnector({
  apiKey: COMETH_API_KEY
});

export const getWagmiConfig = () => createConfig({
  chains: [avalancheFuji],
  ssr: true,
  connectors: [comethConnector],
  transports: {
    [avalancheFuji.id]: http()
  },
  storage: createStorage({
    storage: cookieStorage
  })
});
