import { client } from "@/app/client";
import { ConnectButton as ThirdWebConnectButton } from "thirdweb/react";

export const ConnectButton = () => {
  return (
    <ThirdWebConnectButton
      client={client}
      theme="light"
      connectButton={{ label: "Sign In / Sign Up" }}
    />
  );
};
