"use client";

import { Sidebar } from "./Sidebar";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Link from "next/link";

type ChatLayoutProps = {
  children: React.ReactNode;
};

export function ChatLayout({ children }: ChatLayoutProps) {
  const { history, isLoading, deleteChat } = useChatHistory();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { isAuthenticated } = useAuth();

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {isAuthenticated && (
        <Sidebar
          history={history}
          isLoading={isLoading}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          onDeleteChat={deleteChat}
        />
      )}

      {!isAuthenticated && (
        <div className="absolute top-4 right-18 z-50">
          <Link href="/login">
            <Button className="">Login/Sign up</Button>
          </Link>
        </div>
      )}

      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarCollapsed ? "md:ml-0" : "md:ml-72",
          !isAuthenticated && "md:ml-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
