// NOTE: broken example, Cosmos support is coming soon
import crypto from "crypto";
import * as cosmos from '@cosmostation/cosmosjs';
import * as secp256k1 from 'secp256k1';
// import * as bip39 from 'bip39';

import RampClient, {CosmosSignature, Signature} from "../";
import {GetAccountInfoRequest,WhitelistAddressRequest,Protocol,SetBankAccountRequest} from "../gen/ramp/v1/public_pb";

// const mnemonic = bip39.generateMnemonic();
// console.log("Mnemonic: ", mnemonic);
const mnemonic = "embody scale sign mutual whisper heavy umbrella capital rookie group glad wrap";

const c = new cosmos.Cosmos("https://lcd-cosmos-free.cosmostation.io", "cosmoshub-3");
const privateKey = c.getECPairPriv(mnemonic);
const publicKeyHex = c.getPubKey(privateKey).toString('hex');
const publicKeyB64 = c.getPubKey(privateKey).toString('base64');

console.log("Private Key: ", privateKey.toString('hex'));
console.log("Public Key hex: ", publicKeyHex);
console.log("Public Key base64: ", publicKeyB64);

const signPayload = (payload: string): string => {
    console.log("Signing payload: ", payload);
    const hashed = crypto.createHash('sha256').update(payload).digest();
    console.log("Hashed payload: ", hashed.toString('hex'));
    const sig = "0x" + secp256k1.default.sign(hashed, privateKey).signature.toString('hex');
    console.log("Signature: ", sig);
    return sig;
}

const signAddress = (address: string): string => {
    console.log("Signing address: ", address);
    const hashed = crypto.createHash('sha256').update(address).digest();
    const sig = secp256k1.default.sign(hashed, privateKey).signature.toString('base64');
    console.log("Signature: ", sig);
    return sig;
}

// Note: you can set up unit tests to verify your own code
// given the above mnemonic, if you try signing the payload {}123 you should get the following signature:
// hex encoded: 945d5ddc6df9504158260ff5ee1208ecde9acd302e1267414531898cc944c92362842b913f7ff1ad9aa5944f836503284ec45cca3d4bd214b819b3fa26e9de27
// That happens when signing the correct SHA256 digest of {}123, which is expected to be:
// hex encoded: c57409dde2682c7544f8eb64c8f502de68a1fca7fe7bc789008811f9ec2edc34
// Uncomment to try it with our code:
// signPayload("{}123")

const ramp = new RampClient(
    // note: this is just a placeholder URL for now, not functioning
    "https://dev-api.harborapps-nonprod.link",
    (payload): Promise<Signature> => {
        const sig = signPayload(payload);
        return Promise.resolve({
            signature: sig,
            publicKey: publicKeyHex,
            ...CosmosSignature,
        });
    },
);

// this will return an onboarding url, as this wallet hasn't been linked to any Harbour customer yet
const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.log(accountInfo);

// instead, this is a wallet that has been linked to a Harbour dev user
const linkedMnemonic = "vibrant invest area pistol violin matter plate rapid army hunt betray donor";
const linkedPrivateKey = c.getECPairPriv(linkedMnemonic);
const linkedPublicKeyHex = c.getPubKey(linkedPrivateKey).toString('hex');
const linkedPublicKeyB64 = c.getPubKey(linkedPrivateKey).toString('base64');
const address = c.getAddress(mnemonic);
console.log("Linked private Key: ", linkedPrivateKey.toString('hex'));
console.log("Linked public Key: ", linkedPublicKeyHex);
console.log("Linked address: ", address);

// this will return an actual response with on- and off- ramping details
const activeAccountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.dir(activeAccountInfo, { depth: null });

// we do not support whitelisting of Cosmos addresses yet, stop here
process.exit(0);

// The first time a user connects their wallet and selects and address for on-ramping, they need to whitelist their crypto wallet address.
// Since the endpoint is idempotent, you can repeat the action every time, without worrying about "is it already whitelisted" logic,
// or you can implement such logic to optimize network usage, your choice.
const whitelistResp = await ramp.whitelistAddress(
  new WhitelistAddressRequest({
    protocol: Protocol.TERRA,
    address: address,
    publicKey: linkedPublicKeyB64,
    name: "My Terra Wallet #1",
    addressSignature: signAddress(address),
  }),
);

console.log("Whitelist response received")
console.dir(whitelistResp, { depth: null });

// One more step is required for off-ramping: the bank account on which the user is supposed to receive funds has to be set
await ramp.setBankAccount(
  new SetBankAccountRequest({
    bankAccount: {
      case: "iban",
      value: {
        iban: "",
      },
    },
  }),
);
