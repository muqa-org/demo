import axios from 'axios';

const BASE_URL = 'https://api.connect.cometh.io';
const API_KEY = process.env.COMETH_API_KEY;

type verifySignatureResponse = {
  success: boolean,
  result: boolean
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: { common: {
    apikey: API_KEY
  }}
});

export async function verifySignature(
  address: string,
  message: string,
  signature: string
): Promise<verifySignatureResponse> {
  const body = { message, signature };
  const response = await api.post(`/wallets/${address}/is-valid-signature`, body);
  return response.data;
}
