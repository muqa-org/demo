'use client';

import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

import { Button, ButtonProps } from './Button';
import { comethConfig } from '@allo/kit';
import { PropsWithChildren, useState } from 'react';
import { useTranslations } from 'next-intl';
import { signIn, signOut } from 'next-auth/react';
import { WalletNonceResponse } from '../api/auth/web3/nonce/route';

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

async function getNonce(address: `0x${string}`) {
  const body = JSON.stringify({ address });
  const headers = {
    'Content-Type': 'application/json',
  };

  const res = await fetch('/api/auth/web3/nonce', {
     method: 'POST',
     headers,
     body,
  });

  const { nonce } = await res.json() as WalletNonceResponse;
  return nonce;
}

export function MuqaConnectButton({ children, ...props }: PropsWithChildren<ButtonProps>): JSX.Element {
  const account = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [showTooltip, setShowTooltip] = useState(false);
  const label = getLabel();

  const onMouseEnter = () => setShowTooltip(!!account?.address && true);
  const onMouseLeave = () => setShowTooltip(false);

  async function signInWithWeb3() {
    const { accounts } = await connectAsync({ connector: comethConfig.connector });
    const [address] = accounts;
    const nonce = await getNonce(address);
    const signedNonce = await signMessageAsync({ message: nonce });
    await signIn('credentials', { address, signedNonce, redirect: false });
  }

  async function signOutWithWeb3() {
    disconnect();
    await signOut();
  }

  function onClick() {
    return account.isConnected
      ? signOutWithWeb3()
      : signInWithWeb3();
  }

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
