'use client';

import { ApiProvider, ComethProvider, strategies } from '@allo/kit';
import { getWagmiConfig } from '@allo/kit/wagmi';
import { State } from 'wagmi';

type Props = Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>

const alloApi = {
  upload: async (data: any) =>
    fetch(`/api/ipfs`, { method: 'POST', body: data })
      .then((r) => r.json())
      .then((r) => r.cid),
}

const config = getWagmiConfig();

export function AlloKitProviders({ children, initialState }: Props) {
  return (
    <ApiProvider strategies={strategies} api={alloApi}>
      <ComethProvider initialState={initialState} config={config}>
        {children}
      </ComethProvider>
    </ApiProvider>
  );
}
