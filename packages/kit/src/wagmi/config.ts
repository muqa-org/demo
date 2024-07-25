import { comethConnectConnector } from '@cometh/connect-sdk-viem'

const COMETH_API_KEY = process.env.NEXT_PUBLIC_COMETH_API_KEY!

export const comethConnector = comethConnectConnector({
  apiKey: COMETH_API_KEY
});
