import type { Metadata } from "next";
import "./globals.css";

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "Scrollmate | Social Media Management",
  description: "Scrollmate helps growing brands win every scroll through content, community, and strategy.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Scrollmate | Social Media Management",
    description: "Scrollmate helps growing brands win every scroll through content, community, and strategy.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1680,
        height: 945,
        alt: "Scrollmate — Your soulmate for every scroll you take",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrollmate | Social Media Management",
    description: "Scrollmate helps growing brands win every scroll through content, community, and strategy.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
