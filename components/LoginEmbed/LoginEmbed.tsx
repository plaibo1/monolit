"use client";

import { thirdwebClient } from "@/lib/thirdweb-options";

import { ConnectEmbed } from "thirdweb/react";
import { wallets } from "@/lib/thirdweb-options";
import { doLogin, doLogout, getLoginPayload, isLoggedIn } from "@/lib/auth-api";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const welcomeScreen = {
  title: "Welcome to Monolit",
  description: "Connect your wallet to get started",
};

export const LoginEmbed = () => {
  const { theme } = useTheme();
  const router = useRouter();

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
        theme={theme as "dark" | "light"}
        client={thirdwebClient}
        wallets={wallets}
        welcomeScreen={welcomeScreen}
        auth={{
          // 1. Backend generates a payload for the user to sign
          getLoginPayload,
          // 2. Verify the signature on the backend and set a session/cookie
          doLogin,
          // 3. Check if the user is already logged in
          isLoggedIn: async () => {
            const status = await isLoggedIn();
            if (status) {
              // redirect to home
              router.push("/");
              return true;
            }
            return false;
          },
          // 4. Logout the user
          doLogout,
        }}
      />
    </div>
  );
};
