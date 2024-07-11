"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from './ui/button';
import { comethConnector } from './wagmi/config';

const TRUNCATE_LENGTH = 20;

export function ComethButton(): JSX.Element {
  const { address, isConnecting, status } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  let label: string;
  if (status === 'connected') label = `Disconnect ${address}`;
  else if (status === 'disconnected') label = 'Connect';
  else label = 'Connecting';

  const truncate = (str: string) => str.length > TRUNCATE_LENGTH
    ? `${str.slice(0, TRUNCATE_LENGTH)}...`
    : str;

  const onClick = status === 'disconnected'
    ? () => connect({ connector: comethConnector })
    : () => disconnect();

  return (
     <>
      <Button isLoading={isConnecting} onClick={onClick}>
        {truncate(label)}
      </Button>
     </>
  )
}
