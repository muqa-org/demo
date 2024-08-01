'use client';

import { ComethWallet } from '@cometh/connect-sdk';
import { useEffect } from 'react';
import { useAccount, UseAccountReturnType, useConnect, useDisconnect } from 'wagmi';

import { GetAccountInfoRequest } from './lib/harbour/gen/ramp/v1/public_pb';
import RampClient, { EthereumSignature, Signature } from './lib/harbour/src';
import { Button } from './ui/button';
import { comethConnector } from './wagmi/config';

const TRUNCATE_LENGTH = 20;
const RAMP_URL = 'https://dev-api.harborapps-nonprod.link';

const truncate = (str: string) => str.length > TRUNCATE_LENGTH
  ? `${str.slice(0, TRUNCATE_LENGTH)}...`
  : str;

export function ComethButton(): JSX.Element {
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  const account = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  let label = 'Connect';

  if (isConnecting) label = 'Connecting';
  else if (isReconnecting) label = 'REConnecting';
  else if (isConnected) label = `Disconnect ${account.address}`;
  else label = 'Connect';

  const onClick = account.status === 'disconnected'
    ? () => connect({ connector: comethConnector })
    : () => disconnect();

  async function getWallet(connector: any): Promise<ComethWallet> {
    return connector.getComethWallet();
  };

  async function initRampClient(account: UseAccountReturnType) {
    const wallet = await getWallet(account.connector);
    const publicKey = (wallet.signer as any).publicKeyId;

    return new RampClient(
      RAMP_URL,
      async (payload: string): Promise<Signature> => {
        const signature = await wallet.signMessage(payload);
        return Promise.resolve({
          signature,
          publicKey: publicKey,
          ...EthereumSignature,
        });
      },
    );
  }

  async function getAccountInfo(account: UseAccountReturnType) {
    const rampClient = await initRampClient(account);
    return rampClient.getAccountInfo(new GetAccountInfoRequest());
  }

  useEffect(() => {
    if (!(account.connector as any)?.getComethWallet) {
      console.log('not connected');
      return;
    }

    getAccountInfo(account).then((accountInfo) => {
      console.log('accountInfo', accountInfo);
    });
    }, [isConnected]);

  // const onLinkHarbour = () => {
  //   const ramp = new RampClient(
  //     // note: this is just a placeholder URL for now, not functioning
  //     "https://dev-api.harborapps-nonprod.link",
  //     (message: any): Promise<any> => {
  //       const sig = wagmiSignMessage({ message});
  //       return Promise.resolve({
  //         signature: sig,
  //         publicKey: account.add,
  //         ...EthereumSignature,
  //       });
  //     },
  //   );
  //   )
  // }

  return (
     <>
      <Button isLoading={account.isConnecting} onClick={onClick}>
        {truncate(label)}
      </Button>
     </>
  )
}
