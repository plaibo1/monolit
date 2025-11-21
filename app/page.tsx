"use client";

import { ChatLayout } from "@/components/ChatLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendFirstMessage } from "@/lib/api";
import { InputArea } from "@/components/InputArea";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sendFirstMessage(message);

      if (response.status === 200 && response.data.chatId) {
        router.push(`/${response.data.chatId}`);
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
    <ChatLayout>
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="max-w-3xl w-full space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Monolit</h1>
            <p className="text-muted-foreground text-lg">
              Ask me anything about your data
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating chat...
            </div>
          )}

          <div className="w-full">
            <InputArea onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
