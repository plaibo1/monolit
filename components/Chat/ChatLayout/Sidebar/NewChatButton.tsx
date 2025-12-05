"use client";

import Link from "next/link";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewChatButtonProps = {
  isCollapsed: boolean;
};

export function NewChatButton({ isCollapsed }: NewChatButtonProps) {
  return (
    <div className="px-3 py-2">
      <Link href="/" className="block">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start gap-2 bg-background hover:bg-accent transition-all",
            isCollapsed ? "px-0 justify-center h-10 w-10 border-0" : "px-4 py-5"
          )}
          title="New Chat"
        >
          <SquarePen className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
      </Link>
    </div>
  );
}
