'use client';

import { ApiProvider, ComethProvider, strategies } from '@allo/kit';
import { SessionProvider } from "next-auth/react";

export function MuqaSessionProvider({
	children,
	session,
}: Readonly<{
	children: React.ReactNode;
	session: any;
}>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export function AlloKitProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApiProvider
      strategies={strategies}
      api={{
        upload: async (data) =>
          fetch(`/api/ipfs`, { method: 'POST', body: data })
            .then((r) => r.json())
            .then((r) => r.cid),
      }}
    >
      <ComethProvider>{children}</ComethProvider>
    </ApiProvider>
  );
}
