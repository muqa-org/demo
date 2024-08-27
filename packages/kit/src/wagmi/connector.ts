import { comethConnectConnector } from '@cometh/connect-sdk-viem';

import { COMETH_API_KEY } from '../auth/config';

export const comethConnector = comethConnectConnector({
  apiKey: COMETH_API_KEY
});
