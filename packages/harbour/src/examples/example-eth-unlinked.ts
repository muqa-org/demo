// In this example we demonstrate how an Ethereum wallet not yet linked to any user will generate a response with the onboarding URL
// Run me with: npx tsx src/examples/example-eth-unlinked.ts

import { keccak256, toUtf8Bytes, Wallet } from "ethers";

import RampClient, { EthereumSignature, Signature } from "../";
import {GetAccountInfoRequest} from "../gen/ramp/v1/public_pb";

const mnemonic = "indoor dish desk flag debris potato excuse depart ticket judge file exit"
const wallet = Wallet.fromPhrase(mnemonic);

console.log("Private key hex: ", wallet.signingKey.privateKey);
console.log("Public key hex: ", wallet.signingKey.publicKey);

const signPayload = (payload: string): string => {
    console.log("Signing payload: ", payload);
    const hashed = keccak256(toUtf8Bytes(payload));
    console.log("Hashed payload: ", hashed);
    const sig = wallet.signingKey.sign(hashed).serialized;
    console.log("Signature: ", sig);
    return sig;
}

// Note: you can set up unit tests to verify your own code.
// Given the above mnemonic, if you try signing the payload {}123 you should get the following signature:
// 0x1770f822dbe9cebd668aff3e13e89ec7d2a9da066502d0d4484e6d5b6801c4f004c683c796c50e68fd09a52e55d36c1e2c26822348dca971e3b90c7650fba3ce1c
// That happens when signing the correct keccak256 digest of {}123, which is expected to be:
// 0x3d3ed5028d167827b60e24aa54eec66f32b7260186793b815561a9279d7354a5
// Uncomment to try it with our code:
signPayload("{}123");

const ramp = new RampClient(
  // note: this is just a placeholder URL for now, not functioning
  "https://dev-api.harborapps-nonprod.link",
  (payload): Promise<Signature> => {
    const sig = signPayload(payload);
    return Promise.resolve({
      signature: sig,
      publicKey: wallet.signingKey.publicKey,
      ...EthereumSignature,
    });
  },
);

// this will return an onboarding url, as this wallet hasn't been linked to any Harbour customer yet
const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.log(accountInfo);
