import type { Metadata } from 'next';
import { DM_Sans, Share_Tech_Mono } from 'next/font/google';
import '@allo/kit/styles.css';
import './globals.css';

import { WalletStatus } from './WalletStatus';
import { Footer } from './components/footer/Footer';
import { Header } from './header';
import { AlloKitProviders } from './providers';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });


export const metadata: Metadata = {
	title: 'MUQA initiative Demo App test1',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='hr'>
			<body className={dmSans.className}>
				<AlloKitProviders>
					<Header />
					<WalletStatus />
					<main>
						{children}
					</main>
					<Footer />
				</AlloKitProviders>
			</body>
		</html>
	);
}
