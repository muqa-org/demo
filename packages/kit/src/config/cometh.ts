import { SupportedNetworks } from '@cometh/connect-sdk';
import { comethConnectConnector } from '@cometh/connect-sdk-viem';
import { arbitrumSepolia, avalancheFuji, Chain, polygon } from 'viem/chains';
import { CreateConfigParameters, CreateConnectorFn, http } from 'wagmi';
import yn from 'yn';

const { ARBITRUM_SEPOLIA, FUJI, POLYGON } = SupportedNetworks;

type BaseConfig = {
  [key: string]: {
    apiKey: string | undefined,
    tenderlyRpc: string | undefined,
    comethChain: SupportedNetworks,
    wagmiChain: Chain
  }
};

type ComethConfig = {
  apiKey: string,
  connector: CreateConnectorFn,
  comethChain: SupportedNetworks,
  wagmiChain: Chain
  wagmi: CreateConfigParameters,
};

const assertEnv = (val: string | undefined) => {
  if (!val) throw new Error(`ENV not set: ${val}`);
  return val;
}

const configs: BaseConfig = {
  'POLYGON': {
    apiKey: process.env.NEXT_PUBLIC_POLYGON_COMETH_API_KEY,
    tenderlyRpc: process.env.NEXT_PUBLIC_POLYGON_TENDERLY_RPC,
    comethChain: POLYGON,
    wagmiChain: polygon,
  },
  'ARBITRUM_SEPOLIA': {
    apiKey: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_COMETH_API_KEY,
    tenderlyRpc: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_TENDERLY_RPC,
    comethChain: ARBITRUM_SEPOLIA,
    wagmiChain: arbitrumSepolia,
  },
  'AVALANCHE_FUJI': {
    apiKey: process.env.NEXT_PUBLIC_AVALANCHE_FUJI_COMETH_API_KEY,
    tenderlyRpc: process.env.NEXT_PUBLIC_AVALANCHE_FUJI_TENDERLY_RPC,
    comethChain: FUJI,
    wagmiChain: avalancheFuji,
  }
}

function getConfig(comethProjectChain: string): ComethConfig {
  const chainConfig = configs[comethProjectChain];

  if (!chainConfig) {
    throw new Error(`No Cometh configuration found for chain: ${comethProjectChain}`);
  }

  const { apiKey, tenderlyRpc, comethChain, wagmiChain } = chainConfig;
  console.log('aaaa', assertEnv(apiKey));
  const connector = comethConnectConnector({ apiKey: assertEnv(apiKey) });

  return {
    apiKey: assertEnv(apiKey),
    connector,
    comethChain,
    wagmiChain,
    wagmi: {
      chains: [wagmiChain],
      transports: {
        [wagmiChain.id]: false && yn(process.env.NEXT_PUBLIC_USE_TENDERLY)
          ? http(assertEnv(tenderlyRpc))
          : http()
      },
      connectors: [connector],
    },
  };
}

const COMETH_PROJECT_CHAIN = assertEnv(process.env.NEXT_PUBLIC_COMETH_PROJECT_CHAIN);

export const comethConfig = getConfig(COMETH_PROJECT_CHAIN);
console.log('config', comethConfig);
