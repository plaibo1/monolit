"use client";

import { AutoConnect, ThirdwebProvider } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb-options";
import { wallets } from "@/lib/thirdweb-options";

export default function AutoConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider>
      <AutoConnect client={thirdwebClient} wallets={wallets} />
      {children}
    </ThirdwebProvider>
  );
}
