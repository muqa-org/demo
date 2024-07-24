// In this example we demonstrate how an Ethereum wallet not yet linked to any user will generate a response with the onboarding URL
// Run me with: npx tsx src/examples/example-eth-linked.ts

import { keccak256, toUtf8Bytes, Wallet } from "ethers";

import RampClient, { EthereumSignature, Signature } from "../";
import {
  GetAccountInfoRequest,
  Protocol,
  SetBankAccountRequest,
  WhitelistAddressRequest,
} from "../gen/ramp/v1/public_pb";

const mnemonic = "smooth clump orphan else enjoy blue legend panda waste weapon wire aunt"
const wallet = Wallet.fromPhrase(mnemonic);
const compressedPubKey = wallet.signingKey.compressedPublicKey;

console.log("Private key: ", wallet.signingKey.privateKey);
console.log("Public key: ", wallet.signingKey.publicKey);
console.log("Public key compressed: ", compressedPubKey);
console.log("Address: ", wallet.address);

const signPayload = (payload: string): string => {
    console.log("Signing payload: ", payload);
    const hashed = keccak256(toUtf8Bytes(payload));
    console.log("Hashed payload: ", hashed);
    const sig = wallet.signingKey.sign(hashed).serialized;
    console.log("Signature: ", sig);
    return sig;
}

const ramp = new RampClient(
  // note: this is just a placeholder URL for now, not functioning
  "https://dev-api.harborapps-nonprod.link",
  (payload): Promise<Signature> => {
    const sig = signPayload(payload);
    return Promise.resolve({
      signature: sig,
      // Note: this is the uncompressed public key
      publicKey: wallet.signingKey.publicKey,
      ...EthereumSignature,
    });
  },
);

// this will return an actual response with on- and off- ramping details
const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.log(accountInfo);

// The first time a user connects their wallet and selects and address for on-ramping, they need to whitelist their crypto wallet address.
// Since the endpoint is idempotent, you can repeat the action every time, without worrying about "is it already whitelisted" logic,
// or you can implement such logic to optimize network usage, your choice.
console.log("Signing address to demonstrate ownership")
const addressPayload = '\x19Ethereum Signed Message:\n' + wallet.address.length + wallet.address;
const addressSig = signPayload(addressPayload)

console.log("Sending whitelist request")
const whitelistResp = await ramp.whitelistAddress(
    new WhitelistAddressRequest({
        protocol: Protocol.ETHEREUM,
        address: wallet.address,
        // Note: the compressed public key has to be passed when whitelisting an address
        publicKey: compressedPubKey,
        name: "ETH Example wallet #1",
        addressSignature: addressSig,
    }),
);

console.log("Whitelist response received")
console.dir(whitelistResp, {depth: null});

// One more step is required for off-ramping: the bank account on which the user is supposed to receive funds has to be set
await ramp.setBankAccount(
    new SetBankAccountRequest({
        bankAccount: {
            case: "iban",
            value: {
                iban: "DE44500105178191381683",
            },
        },
    }),
);

// Note: the above only works for EU (EUR) customers, take a look at our proto definitions for a UK (GBP) customer example
