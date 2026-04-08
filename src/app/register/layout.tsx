import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | PayWithCryptoCard",
  description: "Create your account and start using a crypto virtual Visa card instantly. No KYC required.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Create Account | PayWithCryptoCard",
    description: "Create your account and start using a crypto virtual Visa card instantly. No KYC required.",
    type: "website",
  },
};

export default function RegisterPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
