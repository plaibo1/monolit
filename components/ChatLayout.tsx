"use client";

import { Sidebar } from "./Sidebar";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type ChatLayoutProps = {
  children: React.ReactNode;
};

export function ChatLayout({ children }: ChatLayoutProps) {
  const { history, isLoading, deleteChat } = useChatHistory();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        history={history}
        isLoading={isLoading}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onDeleteChat={deleteChat}
      />
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarCollapsed ? "md:ml-0" : "md:ml-72"
        )}
      >
        {children}
      </main>
    </div>
  );
}
