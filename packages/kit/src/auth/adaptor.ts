import { ConnectAdaptor } from '@cometh/connect-sdk';

import { comethConfig } from '../config';

export const connectAdaptor = new ConnectAdaptor({
  chainId: comethConfig.comethChain,
  apiKey: comethConfig.apiKey,
});
