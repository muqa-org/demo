import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

import Header from './Header';
import { WalletStatus } from './WalletStatus';
import Footer from './components/footer/Footer';
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
					<main>{children}</main>
					<Footer />
				</AlloKitProviders>
			</body>
		</html>
	);
}
