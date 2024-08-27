import { ConnectAdaptor } from '@cometh/connect-sdk';

import { COMETH_API_KEY, DEFAULT_COMETH_NETWORK } from './config';

export const connectAdaptor = new ConnectAdaptor({
  chainId: DEFAULT_COMETH_NETWORK,
  apiKey: COMETH_API_KEY,
});
