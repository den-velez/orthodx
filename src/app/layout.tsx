import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "./manifest.json",
  title: "OrthoDx",
  description: "Welcome to orthodx, the best orthodontic diagnotics app",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} `}>{children}</body>
    </html>
  );
}
