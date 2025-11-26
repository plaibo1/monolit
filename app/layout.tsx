import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AutoConnectLayout from "./auto-connect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monolit",
  description: "Monolit - new way to find ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AutoConnectLayout>{children}</AutoConnectLayout>
      </body>
    </html>
  );
}
