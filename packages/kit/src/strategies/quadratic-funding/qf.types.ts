export type CartAllocation = {
  recipientAddress: `0x${string}`,
  amount: number | bigint,
};

export type TokenMetadata = {
  name: string;
  address: `0x${string}`;
  nonce: bigint;
}
