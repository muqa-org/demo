// In this example we demonstrate how a AlephZero wallet not yet linked to any user will generate a response with the onboarding URL
// Run me with: npx tsx src/examples/example-aleph-zero-unlinked.ts
import RampClient, {AlephZeroSignature, Signature} from "../";
import {GetAccountInfoRequest} from "../gen/ramp/v1/public_pb";

import {Keyring} from '@polkadot/keyring';
import {blake2AsU8a, cryptoWaitReady} from '@polkadot/util-crypto';
import {u8aToHex} from "@polkadot/util";
import {KeyringPair} from "@polkadot/keyring/types";

const mnemonic = "vibrant invest area pistol violin matter plate rapid army hunt betray donor";


// Wait for the WASM crypto to be ready
await cryptoWaitReady();

const keyring = new Keyring({type: 'sr25519'});

const privateKey = keyring.addFromMnemonic(mnemonic);
const publicKeyHex = u8aToHex(privateKey.publicKey);

console.log("Public Key Hex: ", publicKeyHex);

const signPayload = (pk: KeyringPair, payload: string): string => {
    console.log("Signing payload: ", payload);
    // Hash the payload using BLAKE2b-256
    const hashedPayload = blake2AsU8a(payload, 256);
    console.log(`Hashed payload: `, u8aToHex(hashedPayload).toString());
    let sig = u8aToHex(pk.sign(hashedPayload))
    console.log("Signature: ", sig);
    return sig;
}

const ramp = new RampClient(
    // note: this is just a placeholder URL for now, not functioning
    "https://dev-api.harborapps-nonprod.link",
    (payload): Promise<Signature> => {
        const sig = signPayload(privateKey, payload);
        return Promise.resolve({
            signature: sig,
            publicKey: publicKeyHex,
            ...AlephZeroSignature,
        });
    },
);

// this will return an onboarding url, as this wallet hasn't been linked to any Harbour customer yet
const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.log(accountInfo);
