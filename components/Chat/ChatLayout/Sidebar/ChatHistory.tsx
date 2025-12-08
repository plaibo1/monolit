"use client";

import Link from "next/link";
import { MoreVertical, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useChatHistory } from "@/hooks/useChatHistory";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type ChatHistoryProps = {
  isCollapsed: boolean;
};

export function ChatHistory({ isCollapsed }: ChatHistoryProps) {
  const { history, isLoading, deleteChat } = useChatHistory();
  const pathname = usePathname();
  const router = useRouter();

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();

    const chatToDelete = history.find((chat) => chat.id === chatId);
    if (!chatToDelete) return;

    // Check if we're deleting the currently active chat
    const isDeletingActiveChat = pathname === `/${chatId}`;

    // Redirect to home if deleting active chat
    if (isDeletingActiveChat) {
      router.push("/");
    }

    // Call deleteChat and get the cancel function
    const cancelDelete = deleteChat(chatId);

    toast.success("Chat deleted", {
      description: `"${chatToDelete.name}" will be permanently deleted in 10 seconds`,
      action: {
        label: "Undo",
        onClick: () => {
          cancelDelete();
          toast.success("Deletion cancelled", {
            description: `"${chatToDelete.name}" has been restored`,
          });

          // If we redirected, go back to the chat
          if (isDeletingActiveChat) {
            router.push(`/${chatId}`);
          }
        },
      },
      duration: 10000, // 10 seconds to match deletion delay
    });
  };

  const isActive = (chatId: string) => pathname === `/${chatId}`;

  return (
    <ScrollArea className="flex-1 px-3 py-2 h-[calc(100vh-185px)] max-h-[calc(100vh-185px)]">
      {!isCollapsed ? (
        <div className="space-y-1">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="py-2">
                <Skeleton className="h-4 w-3/4 mb-2 rounded-lg" />
                <Skeleton className="h-3 w-1/2 rounded-lg" />
              </div>
            ))
          ) : history.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No chat history.
            </div>
          ) : (
            history.map((chat) => (
              <div key={chat.id} className="relative group">
                <Link
                  href={`/${chat.id}`}
                  className={cn(
                    "block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted/80 active:bg-muted/60",
                    isActive(chat.id) && "bg-muted font-medium"
                  )}
                >
                  <div className="truncate max-w-[90%]">{chat.name}</div>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1.5 h-7 w-7 xl:opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive rounded-lg cursor-pointer"
                      onClick={(e) => handleDeleteClick(e, chat.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      ) : (
        // Collapsed State: Show nothing or maybe recent icons?
        // ChatGPT hides history when collapsed.
        <div className="flex flex-col items-center gap-2">
          {/* Optional: Tooltip icons for history could go here, but for now we hide it */}
        </div>
      )}
    </ScrollArea>
  );
}
