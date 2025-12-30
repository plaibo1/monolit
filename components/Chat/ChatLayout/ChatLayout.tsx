"use client";

import { Sidebar } from "./Sidebar";
import { useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatDebugger } from "../ChatDebugger/ChatDebugger";

type ChatLayoutProps = {
  children: React.ReactNode;
};

export function ChatLayout({ children }: ChatLayoutProps) {
  // Default to collapsed (mobile-first) to prevent flash of overlay
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Expand on desktop by default
  useEffect(() => {
    const storedState = localStorage.getItem("sidebar_collapsed");

    if (storedState !== null) {
      setIsSidebarCollapsed(JSON.parse(storedState));
    } else {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setIsSidebarCollapsed(false);
        }
      };

      // Initial check
      handleResize();
    }

    // Optional: Listen for resize if we want dynamic behavior,
    // but usually we just want initial state.
    // Leaving it as just initial check for now to allow user toggle.
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar_collapsed", JSON.stringify(newState));
      return newState;
    });
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      {isAuthenticated && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />
      )}

      {!isAuthenticated && pathname !== "/login" && !isLoading && (
        <div className="absolute top-4 right-18 z-50">
          <Link href="/login">
            <Button className="">Login/Sign up</Button>
          </Link>
        </div>
      )}

      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          // Mobile: ml-0 always (Sidebar is overlay)
          "ml-0",
          // Desktop: Margin based on sidebar width
          isAuthenticated
            ? isSidebarCollapsed
              ? "md:ml-[60px]"
              : "md:ml-[285px]"
            : "md:ml-0"
        )}
      >
        {children}
      </main>
      <ChatDebugger />
    </div>
  );
}
