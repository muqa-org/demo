'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Button, ButtonProps } from './Button';
import { comethConnector } from '@allo/kit/wagmi';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';

const TRUNCATE_LENGTH = 20;
const TRUNCATE_OFFSET = 3;

const truncate = (str?: `0x${string}`) => str && str.length > TRUNCATE_LENGTH
  ? `${str.slice(0, TRUNCATE_OFFSET + 2)}...${str.slice(-TRUNCATE_OFFSET)}`
  : `${str}`;

function getLabel() {
  const t = useTranslations('auth');
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  const account = useAccount()

  let label = t('connect');
  const address = truncate(account.address);

  if (isConnecting) label = t('connecting');
  else if (isReconnecting) label = t('reconnect');
  else if (isConnected) label = `${t('disconnect')} ${address}`;

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

function LoadingIcon() {
  const { isConnecting, isReconnecting } = useAccount();
  const isLoading = isConnecting || isReconnecting;

  return (
    <>
    {isLoading && <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-primary rounded-full"></div>}
    </>
  );
}

export function MuqaConnectButton({ children, ...props }: PropsWithChildren<ButtonProps>): JSX.Element {
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
        <LoadingIcon />
        {children || label}
      </Button>
      <AddressTooltip show={showTooltip} label={account.address} />
     </div>
  )
}
