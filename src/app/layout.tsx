import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { WalletProvider } from "./components/WalletProvider";

const poppins = Poppins({ 
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  adjustFontFallback: false,
  preload: true,
});

export const metadata: Metadata = {
  title: "Risy DAO Panel",
  description: "Risy DAO Management Panel",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`} suppressHydrationWarning={true}>
        <ThirdwebProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
