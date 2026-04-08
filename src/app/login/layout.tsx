import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | PayWithCryptoCard",
  description: "Login to your PayWithCryptoCard dashboard and manage your virtual crypto cards.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Login | PayWithCryptoCard",
    description: "Login to your PayWithCryptoCard dashboard and manage your virtual crypto cards.",
    type: "website",
  },
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
