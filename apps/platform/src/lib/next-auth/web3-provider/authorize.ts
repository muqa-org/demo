import { deleteUserNonce, getUserWithNonce } from '@muqa/db';
import { RequestInternal } from 'next-auth';;
import { verifySignature } from '@/lib/cometh/api';

export default async function authorize(
  credentials: Record<'address' | 'signedNonce', string> | undefined,
  req: Pick<RequestInternal, 'body' | 'headers' | 'method' | 'query'>
) {
  console.log('authorizing crypto', credentials);
  if (!credentials) return null;

  const { address, signedNonce } = credentials;

  // Get user from database with their generated nonce
  const user = await getUserWithNonce(address);
  console.log('user', user);

  if (!user?.authNonce) return null;

  // Check nonce signature against Cometh's api
  const verification = await verifySignature(
    address, user.authNonce.nonce, signedNonce);

  if (!verification.result) return null;

  // Check that the nonce is not expired
  if (user.authNonce.expiresAt < new Date()) return null;

  // Everything is fine, clear the nonce and return the user
  await deleteUserNonce(user);

  return {
    id: user.id,
    address: user.address,
  };
}
