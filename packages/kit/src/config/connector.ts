'use client';

import { ComethWallet } from '@cometh/connect-sdk';
import { comethConnectConnector } from '@cometh/connect-sdk-viem';
import { Connector } from 'wagmi';

import { comethConfig } from './cometh';

type ComethConnectorAddons = {
  getComethWallet: () => Promise<ComethWallet>
}

export type ComethConnector = Connector & ComethConnectorAddons;

export const comethConnector = comethConnectConnector({
  apiKey: comethConfig.apiKey,
  rpcUrl: comethConfig.transportUrl,
});
