// import axios from 'axios';
// import RampClient, { EthereumSignature, Signature } from '../../lib/harbour/src';

// const API_URL = 'https://dev-api.harborapps-nonprod.link';

// async function initRampClient(publicKey: string) {
//   return new RampClient(
//     API_URL,
//     async (payload: string): Promise<Signature> => {
//       const signature = await wallet.signMessage(payload);
//       return Promise.resolve({
//         signature,
//         publicKey,
//         ...EthereumSignature,
//       });
//     },
//   );
// }

// // Define an API route
// export default async function handler(req, res) {
//   try {
//     // Make the external API call
//     const response = await axios.get(`${RAMP_URL}/api/data`);

//     // Handle the response
//     const data = response.data;
//     // Do something with the data...

//     // Send the response back to the client
//     res.status(200).json(data);
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
