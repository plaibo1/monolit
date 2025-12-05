"use client";

import { cn } from "@/lib/utils";
import { MobileTrigger } from "./MobileTrigger";
import { SidebarHeader } from "./SidebarHeader";
import { NewChatButton } from "./NewChatButton";
import { ChatHistory } from "./ChatHistory";
import { SidebarFooter } from "./SidebarFooter";
import { MobileOverlay } from "./MobileOverlay";

type SidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <>
      <MobileTrigger
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background border-r transition-all duration-300 ease-in-out",
          // Mobile: Hidden (off-screen) when collapsed, Overlay when open
          isCollapsed
            ? "-translate-x-full"
            : "translate-x-0 w-[85%] max-w-[300px] shadow-2xl",

          // Desktop: Always visible, width changes
          "md:translate-x-0",
          isCollapsed ? "md:w-[60px]" : "md:w-[285px]"
        )}
      >
        <div className="flex flex-col h-full">
          <SidebarHeader
            isCollapsed={isCollapsed}
            onToggleCollapse={onToggleCollapse}
          />

          <NewChatButton isCollapsed={isCollapsed} />

          <ChatHistory isCollapsed={isCollapsed} />

          <SidebarFooter isCollapsed={isCollapsed} />
        </div>
      </aside>

      <MobileOverlay
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
    </>
  );
}
