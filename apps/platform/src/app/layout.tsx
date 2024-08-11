import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { WalletStatus } from './WalletStatus';
import { AlloKitProviders } from './providers';
import Header from '@/app/Header';
import NotificationBar from '@/app/components/NotificationBar';
import Footer from '@/app/components/footer/Footer';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
	title: 'MUQA initiative Demo App test1',
	description: '',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();

	// Providing all messages to the client
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={dmSans.className}>
				<NextIntlClientProvider messages={messages}>
					<AlloKitProviders>
						<NotificationBar message='notification' />
						<Header />
						<WalletStatus />
						<main>{children}</main>
						<Footer />
					</AlloKitProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
