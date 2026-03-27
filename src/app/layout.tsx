import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Crypto Virtual Visa Card | No KYC | PayWithCryptoCard",
  description: "Create a virtual crypto Visa card instantly. No KYC required. Fund with BTC, ETH, USDT, USDC or XMR and pay online worldwide.",
  keywords: ["crypto", "virtual card", "Visa", "no KYC", "bitcoin", "ethereum", "USDT", "USDC", "XMR", "Monero"],
  authors: [{ name: "PayWithCryptoCard" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Crypto Virtual Visa Card | No KYC | PayWithCryptoCard",
    description: "Create a virtual crypto Visa card instantly. No KYC required. Fund with BTC, ETH, USDT, USDC or XMR and pay online worldwide.",
    type: "website",
    url: "https://paywithcryptocard.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} font-body antialiased bg-dark-950 text-text-primary`}>
        <Providers>
          {children}
        </Providers>
        <ChatWidgetWrapper />
      </body>
    </html>
  );
}
