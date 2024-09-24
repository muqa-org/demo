import { comethConnectConnector } from '@cometh/connect-sdk-viem';

import { comethConfig } from '../config/';

export const comethConnector = comethConnectConnector({
  apiKey: comethConfig.apiKey
});
