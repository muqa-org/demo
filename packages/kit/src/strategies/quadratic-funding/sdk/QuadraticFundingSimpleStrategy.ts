import { Allo, ConstructorArgs, TransactionData } from '@allo-team/allo-v2-sdk';
import { abi as alloAbi } from '@allo-team/allo-v2-sdk/dist/Allo/allo.config';
import { Chain, getContract, http, PublicClient, Transport, createPublicClient, extractChain, encodeAbiParameters, parseAbiParameters, encodeFunctionData } from 'viem';

import { supportedChains } from './chains.config';
import strategyAbi from './strategyAbi';
import { Allocation } from './types';

export class QuadraticFundingSimpleStrategy {

  private client: PublicClient<Transport, Chain>;
  private poolId: bigint;
  private strategyAddress: `0x${string}` | undefined;
  private strategyContract: any;
  private allo: Allo;

  constructor({ chain, rpc, address: strategyAddress, poolId }: ConstructorArgs) {
    this.client = this.createClient(chain, rpc);

    this.allo = new Allo({ chain, rpc });

    this.poolId = poolId ?? BigInt(-1);

    if (strategyAddress) {
      this.setStrategyContract(strategyAddress);
    }
  }

  private createClient(chainId: number, rpc?: string) {
    const extractedChain = extractChain({
      id: chainId,
      chains: supportedChains,
    });

    return createPublicClient({
      chain: extractedChain,
      transport: http(rpc ?? ''),
    });
  }

  private checkPoolId(): void {
    if (this.poolId === BigInt(-1))
      throw new Error(
        'QuadraticFundingSimpleStrategy: No poolId provided. Please call `setPoolId` first.',
      );
  }

  /**
   * Sets the strategy contract for the instance.
   * @param address The address of the strategy contract.
   */
  public setStrategyContract(strategyAddress: `0x${string}`) {
    this.strategyAddress = strategyAddress;
    this.strategyContract = getContract({
      address: strategyAddress,
      abi: strategyAbi,
      client: {
        public: this.client,
      }
    })
  }

  public async setPoolId(poolId: bigint) {
    this.poolId = poolId;
    const strategyAddress = await this.allo.getStrategy(poolId);
    this.setStrategyContract(strategyAddress as `0x${string}`);
  }

  /**
   * Generates the transaction data for allocating voice credits to recipients.
   * @param allocations - Allocation[]: [{recipientId: `0x${string}`, voiceCreditsToAllocate: bigint}]
   * @returns TransactionData object: {to: `0x${string}`, data: `0x${string}`, value: string}
   */
  public getAllocateData(allocation: Allocation): TransactionData {
    this.checkPoolId();

    // TODO: Add check if the token is native and add to totalNativeAmount if so
    let totalNativeAmount = BigInt(0);

    const strategyParams = encodeAbiParameters(
      parseAbiParameters(
        '(address recipientId, uint256 voiceCreditsToAllocate)',
      ),
      [allocation],
    );

    const encodedData = encodeFunctionData({
      abi: alloAbi,
      functionName: 'allocate',
      args: [this.poolId, strategyParams],
    });

    return {
      to: this.allo.address(),
      data: encodedData,
      value: totalNativeAmount.toString(),
    };
  }

  public getAddAllocatorData(allocator: `0x${string}`): TransactionData {
    this.checkPoolId();

    const encodedData = encodeFunctionData({
      abi: strategyAbi,
      functionName: 'addAllocator',
      args: [allocator],
    });

    return {
      to: this.strategyAddress as `0x${string}`,
      data: encodedData,
      value: BigInt(0).toString(),
    };
  }
}
