# Internal notes for dev team

For most protocols there's two examples: one with a wallet key which is already linked to a Harbour dev user, and one
which isn't. For the sake of tracking which test user they belong to, here's a comprehensive list:

#### Aleph

Pubkey hex: `0x1aaa0eda497c5a7e3c0d54ba8bd3f23a98cd5b833e4d6a9097790fd39fc80442`
PubKey b64 (as stored in db): `GqoO2kl8Wn48DVS6i9PyOpjNW4M+TWqQl3kP05/IBEI=`
Device ID: `5c503acf-9d6f-497c-a37b-c2ba908cde2b`
User ID: `5cf9deb6-cdbe-495c-8f5f-c88aae09d1e5`

#### Terra

PubKey b64: `Ay0OHiHq7thmZv8e+oImMwmukp7W9C7WszEYXQYztXiA`
Device ID: `64a4aaf1-0814-46fa-b95e-3cc006594554`
User ID: `c51f65e6-0167-4451-a1fe-4b554069fbcf`

#### Ethereum

PubKey compressed: `0x02792b75fc27f4f3f9cd33ef5130fdd8286c3416836728e1f783c41bf52a2bd5ab`
Device ID: `08e5e05e-c4f3-4750-a528-72cc79a35747`
User ID: `c51f65e6-0167-4451-a1fe-4b554069fbcf`

## Restoring a broken link

It is vital to keep these examples working for our integrating parties. Should we ever detect a "linked" example being
broken, it's probably because of manual manipulation of the dev database. Two cases:

1. If the device id is inactive, just flag it as active again.
2. If the device has been removed, simply get the authenticationURL from the first API response, and log into an
   existing dev user, possibly the same it used to be. Then update the device and user id in this document.
