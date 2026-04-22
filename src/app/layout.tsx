import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
  description: "Get a virtual Visa card with crypto. No KYC. Pay online worldwide using BTC, ETH, USDT, USDC, XMR.",
  keywords: ["crypto", "virtual card", "Visa", "no KYC", "bitcoin", "ethereum", "USDT", "USDC", "XMR", "Monero"],
  authors: [{ name: "PayWithCryptoCard" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "p2N4XO0yCgWRfroqfWHJLbE-QqwnUCD28Jw5Z9e3xyk",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://paywithcryptocard.net/",
  },
  openGraph: {
    title: "Crypto Virtual Visa Card | No KYC | PayWithCryptoCard",
    description: "Get a virtual Visa card with crypto. No KYC. Pay online worldwide using BTC, ETH, USDT, USDC, XMR.",
    type: "website",
    url: "https://paywithcryptocard.net/",
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

      {/* Google Ads Global Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18110117080"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18110117080');
        `}
      </Script>
    </html>
  );
}
