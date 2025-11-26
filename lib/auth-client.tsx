"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  useActiveAccount,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";
import { isLoggedIn, doLogout } from "./auth-api";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();

  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const isLogged = await isLoggedIn();
      setIsAuthenticated(isLogged);
      if (!isLogged) {
        router.push("/login");
      }
      return isLogged;
    } catch (error) {
      console.error("Auth check failed", error);
      setIsAuthenticated(false);
      router.push("/login");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await doLogout();
      if (wallet) {
        disconnect(wallet);
      }
      setIsAuthenticated(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }, [disconnect, wallet, router]);

  // Strict Sync on Mount: If wallet is connected but backend session is invalid, disconnect.
  useEffect(() => {
    const initAuth = async () => {
      const loggedIn = await checkAuth();
      if (!loggedIn && account) {
        // Only disconnect if we have an account but no session on mount
        // This handles the "User deleted cookie and refreshed" case
        if (wallet) disconnect(wallet);
      }
    };
    initAuth();
  }, []); // Run only on mount

  // Watch for account changes (e.g. user switches wallet)
  // We do NOT disconnect here to allow the "Connect -> Sign" flow.
  useEffect(() => {
    if (account) {
      // If account changes, we should re-check auth, but we might be in the middle of login.
      // For now, we just update the user state if we are logged in.
      // If we want to support "Switch Account -> Auto Logout", we can do it here.
      checkAuth();
    } else {
      // If account is removed (disconnected), we are definitely logged out.
      setIsAuthenticated(false);
    }
  }, [account, checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
