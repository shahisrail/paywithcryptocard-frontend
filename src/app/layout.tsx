import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

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
  title: "PayWithCryptoCard - Turn Crypto into Virtual Visa Cards",
  description: "No KYC, no paperwork. Top up with crypto and pay online like a normal card. Create virtual Visa cards in minutes with PayWithCryptoCard.",
  keywords: ["crypto", "virtual card", "Visa", "no KYC", "bitcoin", "ethereum", "USDT"],
  authors: [{ name: "PayWithCryptoCard" }],
  openGraph: {
    title: "PayWithCryptoCard - Turn Crypto into Virtual Visa Cards",
    description: "No KYC, no paperwork. Top up with crypto and pay online like a normal card.",
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
      </body>
    </html>
  );
}
