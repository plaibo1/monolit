"use client";

import { thirdwebClient } from "@/lib/thirdweb-options";
import { useTheme } from "@/hooks/useTheme";
import { ConnectEmbed } from "thirdweb/react";

import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { wallets } from "@/lib/thirdweb-options";
import { doLogin, doLogout, getLoginPayload, isLoggedIn } from "@/lib/auth-api";

const welcomeScreen = {
  title: "Welcome to Monolit",
  description: "Connect your wallet to get started",
};

export const LoginEmbed = () => {
  const { theme } = useTheme();
  const account = useActiveAccount();
  console.log("account", account);
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();

  console.log("Connected as", account?.address);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "1rem",
      }}
    >
      <ConnectEmbed
        theme={theme}
        client={thirdwebClient}
        wallets={wallets}
        welcomeScreen={welcomeScreen}
        auth={{
          // 1. Backend generates a payload for the user to sign
          getLoginPayload,
          // 2. Verify the signature on the backend and set a session/cookie
          doLogin,
          // 3. Check if the user is already logged in
          isLoggedIn,
          // 4. Logout the user
          doLogout,
        }}
      />
      {wallet && <button onClick={() => disconnect(wallet)}>Disconnect</button>}
    </div>
  );
};
