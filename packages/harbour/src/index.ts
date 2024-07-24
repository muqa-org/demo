import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { RampService } from "./gen/ramp/v1/public_connect";

import {
  EstimateOffRampFeeRequest,
  EstimateOffRampFeeResponse,
  EstimateOnRampFeeRequest,
  EstimateOnRampFeeResponse,
  GetAccountInfoRequest,
  GetAccountInfoResponse,
  RemoveAddressRequest,
  RemoveAddressResponse,
  SetBankAccountRequest,
  SetBankAccountResponse,
  WhitelistAddressRequest,
  WhitelistAddressResponse,
} from "./gen/ramp/v1/public_pb";
import { PartialMessage } from "@bufbuild/protobuf";

export class RampClient {
  public client: PromiseClient<typeof RampService>;

  /**
   * Constructs instance of RampClient
   @param endpoint - URL of Harbour API
   @param signer - function which signs every request to Harbour API
   */
  constructor(endpoint: string, signer: SignerFunction) {
    const fetchWithSignature: typeof globalThis.fetch = async (r, init) => {
      if (!(init?.body instanceof Uint8Array)) {
        throw "unsupported body type";
      }
      const bodyText = new TextDecoder().decode(init.body);
      const timestamp = Date.now().toString();
      const data = bodyText + timestamp;
      const signature = await signer(data);

      const headers = new Headers(init?.headers);
      headers.append("X-Signature", signature.signature);
      headers.append(
        "X-Signature-Type",
        `${signature.hashingAlgorithm}/${signature.signingAlgorithm}`,
      );
      headers.append("X-Signature-PublicKey", signature.publicKey);
      headers.append("X-Encoding", signature.encodingAlgorithm);
      headers.append("X-Signature-Timestamp", timestamp);

      const modifiedInit: RequestInit = { ...init, headers };
      return fetch(r, modifiedInit);
    };

    const transport = createConnectTransport({
      baseUrl: endpoint,
      fetch: fetchWithSignature,
    });
    this.client = createPromiseClient(RampService, transport);
  }

  /**
   * Returns account information. If result in the response is of type  authentication then user should be
   * authenticated (onboarded or logged in). Authentication URL is provided in the result.
   */
  public async getAccountInfo(
    request: PartialMessage<GetAccountInfoRequest>,
  ): Promise<GetAccountInfoResponse> {
    return this.client.getAccountInfo(request);
  }

  /**
   * Crypto assets can only be on-ramped to address which belongs to the user. In order to proof address belongs to the
   * user, address need to be signed with private key of this address.
   * @param request - whitelisting parameters
   */
  public async whitelistAddress(
    request: PartialMessage<WhitelistAddressRequest>,
  ): Promise<WhitelistAddressResponse> {
    return this.client.whitelistAddress(request);
  }

  /**
   * Removes whitelisted address
   * @param request - address removing parameters
   */
  public async removeAddress(
    request: RemoveAddressRequest,
  ): Promise<RemoveAddressResponse> {
    return this.client.removeAddress(request);
  }

  /**
   * Set bank account for off-ramping.
   * @param request - bank account parameters
   */
  public async setBankAccount(
    request: SetBankAccountRequest,
  ): Promise<SetBankAccountResponse> {
    return this.client.setBankAccount(request);
  }

  /**
   * Esestimate on ramp fee
   * @param request - on ramp parameters
   */
  public async estimateOnRampFee(
    request: EstimateOnRampFeeRequest,
  ): Promise<EstimateOnRampFeeResponse> {
    return this.client.estimateOnRampFee(request);
  }

  /**
   * Esestimate on ramp fee
   * @param request - on ramp parameters
   */
  public async estimateOffRampFee(
    request: EstimateOffRampFeeRequest,
  ): Promise<EstimateOffRampFeeResponse> {
    return this.client.estimateOffRampFee(request);
  }
}

export default RampClient;

/**
 * Hashing algorithm used for signing requests to Harbour API
 */
export enum HashingAlgorithm {
  Keccak256 = "keccak256",
  SHA256 = "sha256",
  Blake2b256 = "blake2b256",
}

/**
 * Signing algorithm used for signing requests to Harbour API
 */
export enum SigningAlgorithm {
  SECP256K1 = "secp256k1",
  SR25519 = "sr25519"
}

/**
 * Encoding algorithm used for signing requests to Harbour API
 */
export enum EncodingAlgorithm {
  Hex = "hex",
  Base64 = "base64",
}

/**
 * Signature configuration for signing requests to Harbour API
 */
export interface SignatureConfig {
  hashingAlgorithm: HashingAlgorithm;
  signingAlgorithm: SigningAlgorithm;
  encodingAlgorithm: EncodingAlgorithm;
}

/**
 * Signature with metadata for particular request to Harbour API
 */
export interface Signature extends SignatureConfig {
  signature: string;
  publicKey: string;
}

/**
 * Signature function for signing requests to Harbour API. Accepts any data in string format and return signature
 * with metadata
 */
export type SignerFunction = (data: string) => Promise<Signature>;

/**
 * Signature configuration for Ethereum ecosystem
 */
export const EthereumSignature: SignatureConfig = {
  hashingAlgorithm: HashingAlgorithm.Keccak256,
  signingAlgorithm: SigningAlgorithm.SECP256K1,
  encodingAlgorithm: EncodingAlgorithm.Hex,
};

/**
 * Signature configuration for Cosmos ecosystem
 */
export const CosmosSignature: SignatureConfig = {
  hashingAlgorithm: HashingAlgorithm.SHA256,
  signingAlgorithm: SigningAlgorithm.SECP256K1,
  encodingAlgorithm: EncodingAlgorithm.Base64,
};

export const AlephZeroSignature: SignatureConfig = {
  hashingAlgorithm: HashingAlgorithm.Blake2b256,
  signingAlgorithm: SigningAlgorithm.SR25519,
  encodingAlgorithm: EncodingAlgorithm.Hex,
}
