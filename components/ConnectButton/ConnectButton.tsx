"use client";
import { thirdwebClient } from "@/app/client";
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
