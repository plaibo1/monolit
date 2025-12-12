import { useGetChatPublishStatus, usePublishChat } from "@/api/chat";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircle, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const ShareChat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { data: publishState, isLoading: isLoadingPublishState } =
    useGetChatPublishStatus(chatId);
  const { publish, isMutating } = usePublishChat(chatId);

  const isLoading = isLoadingPublishState || isMutating;

  if (!publishState?.can_modify) {
    return null;
  }

  const handlePublish = () => {
    publish(!publishState.shared);
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Share Chat</div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {publishState.shared ? "Public" : "Private"}
            </span>
            <Button
              variant={publishState.shared ? "destructive" : "default"}
              size="sm"
              onClick={handlePublish}
              disabled={isLoading}
            >
              {publishState.shared ? "Unpublish" : "Publish"}
            </Button>
          </div>
          {publishState.shared && (
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
  );
};
