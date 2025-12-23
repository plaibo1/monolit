"use client";

import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import { ShareChat } from "./ShareChat";
import { useSocketStore } from "@/store/useSocketStore";

export function MessageListHeader() {
  const connectionStatus = useSocketStore((state) => state.socketStatus);

  return (
    <div className="sticky top-0 z-30 p-4 flex items-center justify-end gap-2">
      <ShareChat />

      <Badge
        variant={connectionStatus === "connected" ? "default" : "destructive"}
        className="gap-1"
      >
        {connectionStatus === "connected" ? (
          <Wifi className="w-3 h-3" />
        ) : (
          <WifiOff className="w-3 h-3" />
        )}
        <span className="hidden sm:inline">{connectionStatus}</span>
      </Badge>
    </div>
  );
}
