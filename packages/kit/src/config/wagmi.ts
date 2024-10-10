'use client';

import { CreateConfigParameters, http } from 'wagmi';

import { comethConfig } from './cometh';

const { chain } = comethConfig;

export const wagmiConfig: CreateConfigParameters = {
  chains: [chain],
  transports: {
    [chain.id]: http(comethConfig.transportUrl)
  },
}
