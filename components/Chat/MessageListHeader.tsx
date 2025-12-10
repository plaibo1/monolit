"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetChatPublishStatus, usePublishChat } from "@/api/chat";
import { CheckCircle, Share2, Wifi, WifiOff } from "lucide-react";
import { toast } from "sonner";

interface MessageListHeaderProps {
  chatId: string;
  connectionStatus: string;
}

export function MessageListHeader({
  chatId,
  connectionStatus,
}: MessageListHeaderProps) {
  const { data: publishState, isLoading: isLoadingPublishState } =
    useGetChatPublishStatus(chatId);
  const { publish, isMutating } = usePublishChat(chatId);

  const isLoading = isLoadingPublishState || isMutating;

  const handlePublish = () => {
    publish(!publishState?.data.shared);
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      try {
        const url = `${window.location.origin}/${chatId}`;
        await navigator.clipboard.writeText(url);

        toast("Copied", {
          description: "URL copied to clipboard",
          icon: <CheckCircle className="ml-2 h-4 w-4 text-green-500" />,
          position: "top-center",
        });
      } catch (error) {
        console.error("Failed to copy URL to clipboard", error);
        toast("Error", {
          description: "Failed to copy URL to clipboard",
          icon: <CheckCircle className="ml-2 h-4 w-4 text-red-500" />,
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="sticky top-0 z-30 p-4 flex items-center justify-end gap-2">
      {publishState?.data.can_modify && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isLoading}>
              <Share2 className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Share Chat</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {publishState.data.shared ? "Public" : "Private"}
                </span>
                <Button
                  variant={publishState.data.shared ? "destructive" : "default"}
                  size="sm"
                  onClick={handlePublish}
                  disabled={isLoading}
                >
                  {publishState.data.shared ? "Unpublish" : "Publish"}
                </Button>
              </div>
              {publishState.data.shared && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleShare}
                  disabled={isLoading}
                >
                  Copy Link
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}

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
