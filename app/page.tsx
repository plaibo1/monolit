"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/lib/api";
import { CommandCenter } from "@/components/Chat/CommandCenter";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/auth-client";
import { useRevalidateChatHistory } from "@/hooks/useChatHistory";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  const revalidateChatHistory = useRevalidateChatHistory();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (chatId) {
      router.push(`/${chatId}`);
    }
  }, [chatId]);

  const handleSendMessage = async (message: string) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await sendMessage(message);

      if (response.status === 200 && response.data.chat_id) {
        setChatId(response.data.chat_id);

        setTimeout(() => {
          revalidateChatHistory();
        }, 3000);
      } else {
        setError("Failed to create chat");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl px-4 flex flex-col items-center">
        {error && (
          <div className="absolute top-4 bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="absolute top-8 flex items-center justify-center gap-2 text-muted-foreground z-50">
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating chat...
          </div>
        )}

        <CommandCenter onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
