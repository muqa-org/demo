'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Button, ButtonProps } from './Button';
import { comethConnector } from '@allo/kit/wagmi';
import { useState } from 'react';

const TRUNCATE_LENGTH = 20;
const TRUNCATE_OFFSET = 3;

const truncate = (str?: `0x${string}`) => str && str.length > TRUNCATE_LENGTH
  ? `${str.slice(0, TRUNCATE_OFFSET + 2)}...${str.slice(-TRUNCATE_OFFSET)}`
  : `${str}`;

const LABELS = {
  connect: () => 'Prijavi se',
  connecting: () => 'Prijavljujem se',
  reconnecting: () => 'Pononvno prijavljivanje',
  disconnect: (account: string) => `Odjavi ${account}`
}

function getLabel() {
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  const account = useAccount()

  let label = LABELS.connect();

  if (isConnecting) label = LABELS.connecting();
  else if (isReconnecting) label = LABELS.reconnecting();
  else if (isConnected) label = LABELS.disconnect(truncate(account.address));
  else label = LABELS.connect();

  return label;
}

function AddressTooltip({ show, label }: { show: boolean, label?: `0x${string}`}) {
  return (
    <>
    {show && !!label && <div className="absolute top-full right-0 mt-2 w-max p-2 bg-gray-700 font-mono text-white text-sm rounded">
      {label}
    </div>
    }
    </>
  );
}

export function MuqaConnectButton(props: ButtonProps): JSX.Element {
  const account = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const label = getLabel();

  const onClick = account.status === 'disconnected'
    ? () => connect({ connector: comethConnector })
    : () => disconnect();

 const [showTooltip, setShowTooltip] = useState(false);

 const onMouseEnter = () => setShowTooltip(!!account?.address && true);
 const onMouseLeave = () => setShowTooltip(false);

  return (
     <div className='relative'>
      <Button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {label}
      </Button>
      <AddressTooltip show={showTooltip} label={account.address} />
     </div>
  )
}
