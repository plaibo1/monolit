"use client";

import { thirdwebClient } from "@/app/client";
import { useTheme } from "@/hooks/useTheme";
import { ConnectEmbed } from "thirdweb/react";

import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

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
        auth={{
          // 1. Backend generates a payload for the user to sign
          getLoginPayload: async ({ address, chainId }) => {
            // Note: your Go handler expects /api/v1/auth/login with GET for payload
            const res = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_BASE_URL
              }/auth/login?address=${address}&chainId=${chainId || ""}`
            );
            return await res.json();
          },
          // 2. Verify the signature on the backend and set a session/cookie
          doLogin: async (params) => {
            // Note: your Go handler expects /api/v1/auth/login with POST for verification
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
              }
            );
            if (!res.ok) throw new Error("Login failed");
          },
          // 3. Check if the user is already logged in
          isLoggedIn: async () => {
            // Note: your Go handler path is /api/v1/auth/isLoggedIn
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/isLoggedIn`
            );
            // Your handler returns a boolean directly (true/false)
            return await res.json();
          },
          // 4. Logout the user
          doLogout: async () => {
            // Note: your Go handler path is /api/v1/auth/logout
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
              method: "POST",
            });
          },
        }}
      />
      {wallet && <button onClick={() => disconnect(wallet)}>Disconnect</button>}
    </div>
  );
};
