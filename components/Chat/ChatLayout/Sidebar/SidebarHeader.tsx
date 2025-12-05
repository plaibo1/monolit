"use client";

import { Bot, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function SidebarHeader({
  isCollapsed,
  onToggleCollapse,
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center min-h-[60px] px-3",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      {/* Logo / Collapse Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-10 w-10 hover:bg-muted")}
        onClick={onToggleCollapse}
      >
        <Bot className="h-6 w-6" />
      </Button>

      {!isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground flex"
          onClick={onToggleCollapse}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
