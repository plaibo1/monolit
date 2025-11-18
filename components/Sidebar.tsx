"use client";

import {
  MessageSquarePlus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatHistoryItem } from "@/types/chat";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SidebarProps = {
  history: ChatHistoryItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onDeleteChat: (id: string) => void;
};

export function Sidebar({
  history,
  isCollapsed,
  onToggleCollapse,
  onDeleteChat,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  const handleNewChat = () => {
    router.push("/");
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/${chatId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    onDeleteChat(chatId);
  };

  const isActive = (chatId: string) => pathname === `/${chatId}`;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-muted/40 border-r transition-all duration-300",
          isCollapsed
            ? "w-0 -translate-x-full md:translate-x-0"
            : "w-64 translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex flex-col h-full transition-opacity duration-300",
            isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="p-4 border-b h-[73px] flex items-center">
            <Button
              onClick={handleNewChat}
              className="w-full justify-start gap-2"
              variant="outline"
            >
              <MessageSquarePlus className="h-4 w-4" />
              New Chat
            </Button>
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 px-2 py-2">
            <div className="space-y-1">
              {history.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No chat history yet.
                  <br />
                  Start a new conversation!
                </div>
              ) : (
                history.map((chat) => (
                  <div
                    key={chat.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredChat(chat.id)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <button
                      onClick={() => handleChatClick(chat.id)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted",
                        isActive(chat.id) && "bg-muted font-medium"
                      )}
                    >
                      <div className="truncate pr-8">{chat.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </div>
                    </button>

                    {hoveredChat === chat.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => handleDeleteClick(e, chat.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </aside>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-4 z-50 transition-all duration-300 shadow-md bg-background border",
          isCollapsed ? "left-4" : "left-[272px]"
        )}
        onClick={onToggleCollapse}
      >
        {isCollapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>
    </>
  );
}
