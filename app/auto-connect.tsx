"use client";

import { AutoConnect, ThirdwebProvider } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb-options";
import { wallets } from "@/lib/thirdweb-options";
import { AuthProvider } from "@/lib/auth-client";

export default function AutoConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider>
      <AuthProvider>
        <AutoConnect client={thirdwebClient} wallets={wallets} />
        {children}
      </AuthProvider>
    </ThirdwebProvider>
  );
}
