import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AutoConnectLayout from "./auto-connect";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AutoConnectLayout>{children}</AutoConnectLayout>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
