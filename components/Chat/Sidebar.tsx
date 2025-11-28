"use client";

import {
  MoreVertical,
  Trash2,
  LogOut,
  Bot,
  PanelLeft,
  SquarePen,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
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
import { useChatHistory } from "@/hooks/useChatHistory";

type SidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const { history, isLoading, deleteChat } = useChatHistory();

  const pathname = usePathname();
  const account = useActiveAccount();
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  const isActive = (chatId: string) => pathname === `/${chatId}`;

  // Mobile Header / Trigger (Visible when collapsed on mobile)
  const MobileTrigger = (
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

  return (
    <>
      {MobileTrigger}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background border-r transition-all duration-300 ease-in-out",
          // Mobile: Hidden (off-screen) when collapsed, Overlay when open
          isCollapsed
            ? "-translate-x-full"
            : "translate-x-0 w-[85%] max-w-[300px] shadow-2xl",
          // Desktop: Always visible, width changes
          "md:translate-x-0",
          isCollapsed ? "md:w-[60px]" : "md:w-[285px]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={cn(
              "flex items-center h-[60px] px-3",
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

          {/* New Chat */}
          <div className="px-3 py-2">
            <Link href="/" className="block">
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start gap-2 rounded-xl bg-background hover:bg-accent transition-all",
                  isCollapsed
                    ? "px-0 justify-center h-10 w-10 border-0"
                    : "px-4 py-5"
                )}
                title="New Chat"
              >
                <SquarePen className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>New Chat</span>}
              </Button>
            </Link>
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 px-3 py-2 h-[calc(100vh-120px)]">
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
                          "block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted/80",
                          isActive(chat.id) && "bg-muted font-medium"
                        )}
                      >
                        <div className="truncate pr-6">{chat.name}</div>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1.5 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
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

          {/* Footer / Profile */}
          <div className="p-3 mt-auto border-t bg-muted/20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg h-auto py-2 hover:bg-muted",
                    isCollapsed ? "px-0 justify-center" : "px-3"
                  )}
                >
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium shrink-0 overflow-hidden shadow-sm">
                    {/* Avatar Placeholder */}
                    <User className="h-4 w-4" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium truncate">
                        {account
                          ? `${account.address.slice(0, 6)}...`
                          : "Guest"}
                      </div>
                      {account && (
                        <div className="text-xs text-muted-foreground">
                          Free Plan
                        </div>
                      )}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side="top"
                className="w-56 rounded-2xl p-2 mb-4"
              >
                <DropdownMenuItem
                  className="rounded-xl cursor-pointer p-3"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="rounded-xl cursor-pointer text-destructive focus:text-destructive p-3"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onToggleCollapse}
        />
      )}
    </>
  );
}
