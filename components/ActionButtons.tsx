"use client";

import { Button } from "@/components/ui/button";
import type { ActionButton } from "@/types/chat";
import { Sparkles } from "lucide-react";

type ActionButtonsProps = {
  actions: ActionButton[];
  onActionClick: (query: string) => void;
};

export function ActionButtons({ actions, onActionClick }: ActionButtonsProps) {
  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          onClick={() => onActionClick(action.query)}
          className="text-xs h-auto py-2 px-3 gap-2 active:scale-95"
          title={action.tooltip}
        >
          <Sparkles className="w-3 h-3" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
