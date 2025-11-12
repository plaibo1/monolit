"use client";

import { useState, useCallback } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useChatMessages } from "@/hooks/useChatMessages";
import { WebSocketMessageHandler } from "@/lib/websocket-handler";
import { MessageList } from "./MessageList";
import { InputArea } from "./InputArea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ChatInterfaceProps = {
  websocketUrl: string;
};

export function ChatInterface({ websocketUrl }: ChatInterfaceProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [currentAssistantMessageId, setCurrentAssistantMessageId] = useState<
    string | null
  >(null);

  const {
    addMessage,
    updateMessage,
    addActionToMessage,
    addStepToMessage,
    updateStepInMessage,
    getOrderedMessages,
  } = useChatMessages();

  const handleWebSocketMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      const handler = new WebSocketMessageHandler({
        onUserMessage: addMessage,
        onAssistantMessage: (message) => {
          setCurrentAssistantMessageId(message.id);
          addMessage(message);
        },
        onUpdateAssistantMessage: updateMessage,
        onStep: (step) => {
          if (currentAssistantMessageId) {
            addStepToMessage(currentAssistantMessageId, step);
          }
        },
        onUpdateStep: (id, updates) => {
          if (currentAssistantMessageId) {
            updateStepInMessage(currentAssistantMessageId, id, updates);
          }
        },
        onAction: addActionToMessage,
        onTaskStart: () => {
          setIsProcessing(true);
        },
        onTaskEnd: () => {
          setIsProcessing(false);
          setCurrentAssistantMessageId(null);
        },
        onFirstInteraction: (data) => {
          setThreadId(data.thread_id);
        },
        onClearAsk: () => {
          // Handle clear ask if needed
        },
        onClearCallFn: () => {
          // Handle clear call function if needed
        },
      });

      handler.handleMessage(data);
    },
    [
      addMessage,
      updateMessage,
      addActionToMessage,
      addStepToMessage,
      updateStepInMessage,
      currentAssistantMessageId,
    ]
  );

  const { status, sendMessage } = useWebSocket({
    url: websocketUrl,
    onMessage: handleWebSocketMessage,
  });

  const handleSendMessage = useCallback(
    (message: string) => {
      sendMessage(
        JSON.stringify({
          type: "user_message",
          content: message,
          threadId: threadId,
        })
      );
    },
    [sendMessage, threadId]
  );

  const handleActionClick = useCallback(
    (query: string) => {
      handleSendMessage(query);
    },
    [handleSendMessage]
  );

  const messages = getOrderedMessages();

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">DataLayer AI Assistant</h1>
          <p className="text-xs text-muted-foreground">Powered by Chainlit</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={status === "connected" ? "default" : "destructive"}
            className="gap-1"
          >
            {status === "connected" ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            {status}
          </Badge>
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden">
        {status === "error" && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to connect to the chat server. Please check your connection
              and try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex-1 overflow-y-auto">
          <MessageList
            messages={messages}
            isProcessing={isProcessing}
            onActionClick={handleActionClick}
          />
        </div>

        <InputArea
          onSendMessage={handleSendMessage}
          disabled={status !== "connected" || isProcessing}
        />
      </div>
    </div>
  );
}
