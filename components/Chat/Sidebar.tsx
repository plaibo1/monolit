"use client";

import {
  MessageSquarePlus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Trash2,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatHistoryItem } from "@/types/chat";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveAccount } from "thirdweb/react";
import { useAuth } from "@/lib/auth-client";

type SidebarProps = {
  history: ChatHistoryItem[];
  isLoading: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onDeleteChat: (id: string) => void;
};

export function Sidebar({
  history,
  isLoading,
  isCollapsed,
  onToggleCollapse,
  onDeleteChat,
}: SidebarProps) {
  const pathname = usePathname();
  const account = useActiveAccount();
  const { logout } = useAuth();

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
            : "w-72 translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex flex-col h-full transition-opacity duration-300",
            isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="p-4 border-b h-[73px] flex items-center">
            <Link href="/" className="w-full">
              <Button className="w-full justify-start gap-2" variant="outline">
                <MessageSquarePlus className="h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 px-2 py-2 h-[calc(100vh-146px)]">
            <div className="space-y-1 mb-2">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="px-3 py-2.5">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))
              ) : history.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No chat history yet.
                  <br />
                  Start a new conversation!
                </div>
              ) : (
                history.map((chat) => (
                  <div key={chat.id} className="relative group">
                    <Link
                      href={`/${chat.id}`}
                      className={cn(
                        "block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted",
                        isActive(chat.id) && "bg-muted font-medium"
                      )}
                    >
                      <div className="truncate pr-8">{chat.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </div>
                    </Link>

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
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Account Footer */}
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center gap-3">
              {account ? (
                <>
                  <div className="h-9 w-9 rounded-full bg-linear-to-br from-blue-300 to-blue-700 flex items-center justify-center text-white font-medium shrink-0 overflow-hidden">
                    {/* TODO: Check if thirdweb provides avatar, for now using gradient */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {account.address.slice(0, 6)}...
                      {account.address.slice(-4)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-sm text-muted-foreground text-center w-full">
                  Not connected
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-4 z-50 transition-all duration-300 shadow-md bg-background border",
          isCollapsed ? "left-4" : "left-[304px] "
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
