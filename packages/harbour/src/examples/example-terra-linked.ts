// In this example we demonstrate the API responses with all ramp information can be obtained by a Terra wallet
// which is linked to an existing Harbour customer.
// Run me with: npx tsx src/examples/example-terra-linked.ts
import crypto from "crypto";
import * as terra from '@terra-money/terra.js';
import * as secp256k1 from 'secp256k1';

import RampClient, {CosmosSignature, Signature} from "../";
import {
    GetAccountInfoRequest,
    Protocol,
    SetBankAccountRequest,
    WhitelistAddressRequest
} from "../gen/ramp/v1/public_pb";

const mnemonic = "embody scale sign mutual whisper heavy umbrella capital rookie group glad wrap";
const mk = new terra.MnemonicKey({mnemonic: mnemonic})
const privateKey = mk.privateKey
const privateKeyB64 = privateKey.toString('base64')
const publicKeyB64 = mk.publicKey.key;
const address = mk.accAddress

console.log("Private Key base64: ", privateKeyB64);
console.log("Public Key base64: ", publicKeyB64);
console.log("Address: ", address);

const signPayload = (pk: Buffer, payload: string): string => {
    console.log("Signing payload: ", payload);
    const hashed = crypto.createHash('sha256').update(payload).digest();
    console.log("Hashed payload: ", hashed.toString('base64'));
    let sig = secp256k1.default.sign(hashed, pk).signature.toString('base64');
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
            publicKey: publicKeyB64,
            ...CosmosSignature,
        });
    },
);

// this will return an actual response with on- and off- ramping details
const activeAccountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.dir(activeAccountInfo, {depth: null});

// The first time a user connects their wallet and selects and address for on-ramping, they need to whitelist their crypto wallet address.
// Since the endpoint is idempotent, you can repeat the action every time, without worrying about "is it already whitelisted" logic,
// or you can implement such logic to optimize network usage, your choice.
console.log("Signing address to demonstrate ownership")
const addressSig = signPayload(privateKey, address)

console.log("Sending whitelist request")
const whitelistResp = await ramp.whitelistAddress(
    new WhitelistAddressRequest({
        protocol: Protocol.TERRA,
        address: address,
        publicKey: publicKeyB64,
        name: "My Terra Wallet #1",
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