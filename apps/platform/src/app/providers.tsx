"use client";

import { ApiProvider, ComethProvider, strategies } from "@allo/kit";

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
          fetch(`/api/ipfs`, { method: "POST", body: data })
            .then((r) => r.json())
            .then((r) => r.cid),
      }}
    >
      <ComethProvider>{children}</ComethProvider>
    </ApiProvider>
  );
}
