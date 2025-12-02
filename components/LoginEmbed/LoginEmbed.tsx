"use client";

import { thirdwebClient } from "@/lib/thirdweb-options";

import { ConnectEmbed } from "thirdweb/react";
import { wallets } from "@/lib/thirdweb-options";
import { doLogin, doLogout, getLoginPayload, isLoggedIn } from "@/lib/auth-api";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const welcomeScreen = {
  title: "Welcome to Monolit",
  description: "Connect your wallet to get started",
};

export const LoginEmbed = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [wasAuthenticated, setWasAuthenticated] = useState(false);

  // Redirect to home page after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
      return;
    }

    if (wasAuthenticated) {
      if (
        typeof window !== "undefined" &&
        typeof window.location?.reload === "function"
      ) {
        window.location.reload();
      } else {
        redirect("/");
      }
    }
  }, [isAuthenticated, wasAuthenticated]);

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
              setWasAuthenticated(true);
            }

            return status;
          },
          // 4. Logout the user
          doLogout,
        }}
      />
    </div>
  );
};
