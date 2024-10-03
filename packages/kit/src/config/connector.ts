'use client';

import { comethConnectConnector } from '@cometh/connect-sdk-viem';

import { comethConfig } from './cometh';

export type ComethConnector = ReturnType<typeof comethConnectConnector>;

 export const comethConnector = comethConnectConnector({
  apiKey: comethConfig.apiKey,
  rpcUrl: comethConfig.transportUrl,
});
