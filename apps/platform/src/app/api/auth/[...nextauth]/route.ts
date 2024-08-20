import NextAuth from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from "next";
import authOptions from '@/lib/next-auth/web3-provider/auth-options';

const handler = async function auth(req: NextApiRequest, res: NextApiResponse) {
  const isDefaultSigninPage =
    req.method === "GET" && req?.query?.nextauth?.includes("signin");

  // Hide Sign-In with Web3 from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };
