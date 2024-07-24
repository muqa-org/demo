// In this example we demonstrate how a Terra wallet not yet linked to any user will generate a response with the onboarding URL
// Run me with: npx tsx src/examples/example-terra-unlinked.ts

import crypto from "crypto";
import * as terra from '@terra-money/terra.js';
import * as secp256k1 from 'secp256k1';

import RampClient, {CosmosSignature, Signature} from "../";
import {GetAccountInfoRequest} from "../gen/ramp/v1/public_pb";

const mnemonic = "vibrant invest area pistol violin matter plate rapid army hunt betray donor";

const mk = new terra.MnemonicKey({mnemonic: mnemonic})
const privateKey = mk.privateKey
const privateKeyB64 = privateKey.toString('base64')
const publicKeyB64 = mk.publicKey.key;

console.log("Private Key base64: ", privateKeyB64);
console.log("Public Key base64: ", publicKeyB64);

const signPayload = (pk: Buffer, payload: string): string => {
    console.log("Signing payload: ", payload);
    const hashed = crypto.createHash('sha256').update(payload).digest();
    console.log("Hashed payload: ", hashed.toString('base64'));
    let sig = secp256k1.default.sign(hashed, pk).signature.toString('base64');
    console.log("Signature: ", sig);
    return sig;
}

// Note: you can set up unit tests to verify your own code
// given the above mnemonic, if you try signing the payload {}123 you should get the following signature:
// base64 encoded: 602u7y5mx1S17IZacfJIbaLE01qGhOYeeJeTMckgeTVvCGq1TIaIodYtHWuFn9VlMB18S1umVywy8JQkECcHiA==
// That happens when signing the correct SHA256 digest of {}123, which is expected to be:
// base64 encoded: xXQJ3eJoLHVE+OtkyPUC3mih/Kf+e8eJAIgR+ewu3DQ=
// Uncomment to try it with our code:
// signPayload(privateKey, "{}123");

const ramp = new RampClient(
    // note: this is just a placeholder URL for now, not functioning
    "https://dev-api.harborapps-nonprod.link",
    (payload): Promise<Signature> => {
        const sig = signPayload(privateKey, payload);
        return Promise.resolve({
            signature: sig,
            publicKey: publicKeyB64,
            ...CosmosSignature,
        });
    },
);

// this will return an onboarding url, as this wallet hasn't been linked to any Harbour customer yet
const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.log(accountInfo);
