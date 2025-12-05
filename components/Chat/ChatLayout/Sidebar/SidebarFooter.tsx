"use client";

import { User, Wallet, Sun, Moon, Laptop, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  useActiveAccount,
  useWalletBalance,
  useActiveWalletChain,
} from "thirdweb/react";
import { thirdwebClient as client } from "@/lib/thirdweb-options";
import { useAuth } from "@/lib/auth-client";

type SidebarFooterProps = {
  isCollapsed: boolean;
};

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { data: balance } = useWalletBalance({
    client,
    chain,
    address: account?.address,
  });
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
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
                    ? `${account.address.slice(0, 6)}...${account.address.slice(
                        -4
                      )}`
                    : "Guest"}
                </div>
                {account && (
                  <div className="text-xs text-muted-foreground">Free Plan</div>
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
          <div className="px-2 py-1.5 text-sm font-medium flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </div>
            {account && (
              <div className="text-xs text-foreground truncate font-mono bg-muted/50 p-1.5 rounded-md mt-1">
                {account.address}
              </div>
            )}
          </div>

          {account && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm font-medium flex flex-col gap-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="h-4 w-4" />
                  <span>Balance</span>
                </div>
                <div className="text-xs text-foreground font-mono pl-6">
                  {balance?.displayValue.slice(0, 6)} {balance?.symbol}
                </div>
              </div>
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded-lg cursor-pointer p-2">
              <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 mr-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="rounded-lg p-1">
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem
                  value="light"
                  className="rounded-lg cursor-pointer"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="dark"
                  className="rounded-lg cursor-pointer"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="system"
                  className="rounded-lg cursor-pointer"
                >
                  <Laptop className="h-4 w-4 mr-2" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="rounded-lg cursor-pointer text-destructive focus:text-destructive p-2"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
