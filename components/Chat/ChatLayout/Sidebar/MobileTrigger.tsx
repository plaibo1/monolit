"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileTriggerProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function MobileTrigger({
  isCollapsed,
  onToggleCollapse,
}: MobileTriggerProps) {
  return (
    <div
      className={cn(
        "fixed top-3 left-4 z-50 md:hidden transition-opacity duration-300",
        isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-2xl bg-background/80 backdrop-blur-md border shadow-xs"
        onClick={onToggleCollapse}
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );
}
