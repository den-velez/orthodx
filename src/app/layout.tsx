import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OrthoDx",
  description: "Welcome to orthodx, the best orthodontic app",
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
