import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@allo/kit/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { Header } from "./header";
import { AlloKitProviders } from "./providers";
import { WalletStatus } from './WalletStatus';

export const metadata: Metadata = {
  title: "MUQA initiative Demo App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlloKitProviders>
          <Header />
          <WalletStatus/>
          <main className="max-w-screen-lg mx-auto py-16">{children}</main>
        </AlloKitProviders>
      </body>
    </html>
  );
}
