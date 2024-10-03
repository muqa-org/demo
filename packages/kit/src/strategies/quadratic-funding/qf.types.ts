export type CartAllocation = {
  recipientAddress: `0x${string}`,
  amount: number | bigint,
};

export type TokenMetadata = {
  name: string;
  decimals: number;
  address: `0x${string}`;
  nonce: bigint;
}
