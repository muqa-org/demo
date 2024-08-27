import { connectAdaptor } from '../adaptor';

export async function retrieveWalletAddress() {
  try {
    const address = await connectAdaptor.retrieveWalletAddressFromSigner();
    return { address, error: null };
  } catch (error) {
    console.error('Error retrieving wallet address:', error);
    return { address: null, error };
  }
}
