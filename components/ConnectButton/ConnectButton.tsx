"use client";
import { thirdwebClient } from "@/lib/thirdweb-options";
import { ConnectButton as ThirdWebConnectButton } from "thirdweb/react";

export const ConnectButton = () => {
  return (
    <ThirdWebConnectButton
      client={thirdwebClient}
      theme="light"
      connectButton={{ label: "Sign In / Sign Up" }}
    />
  );
};
