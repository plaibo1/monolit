"use client";

import { useState, useCallback, useRef } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useChatMessages } from "@/hooks/useChatMessages";
import { WebSocketMessageHandler } from "@/lib/websocket-handler";
import { MessageList } from "./MessageList";
import { InputArea, type InputAreaRef } from "./InputArea";
import { HtmlPanel } from "./HtmlPanel";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getWebSocketUrl, sendMessage } from "@/lib/api";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";

type ChatInterfaceProps = {
  chatId: string;
};

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState<{
    html: string;
    messageId: string;
  } | null>(null);
  const currentAssistantMessageId = useRef<string | null>(null);

  const inputRef = useRef<InputAreaRef>(null);

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
          currentAssistantMessageId.current = message.id;
          addMessage(message);
        },
        onUpdateAssistantMessage: updateMessage,
        onStep: (step) => {
          if (currentAssistantMessageId.current) {
            addStepToMessage(currentAssistantMessageId.current, step);
          }
        },
        onUpdateStep: (id, updates) => {
          if (currentAssistantMessageId.current) {
            updateStepInMessage(currentAssistantMessageId.current, id, updates);
          }
        },
        onAction: addActionToMessage,
        onTaskStart: () => {
          setIsProcessing(true);
        },
        onTaskEnd: () => {
          setIsProcessing(false);
          currentAssistantMessageId.current = null;
        },
        onFirstInteraction: (data) => {
          // setThreadId(data.thread_id);
        },
        onClearAsk: () => {
          // Handle clear ask if needed
        },
        onClearCallFn: () => {
          // Handle clear call function if needed
        },
        onUnknownMessage: (message) => {
          addMessage(message);
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

  const websocketUrl = getWebSocketUrl(chatId);

  const { status } = useWebSocket({
    url: websocketUrl,
    onMessage: handleWebSocketMessage,
  });

  const handleSendMessage = useCallback(
    (message: string, cbChatId?: string) => {
      sendMessage(message, cbChatId || chatId);
    },
    [sendMessage, chatId]
  );

  const handleActionClick = useCallback((query: string) => {
    inputRef.current?.setValue(query);
  }, []);

  const handleActionHold = useCallback(
    (query: string) => {
      console.log("🚀 ~ ChatInterface ~ query:", query);
      handleSendMessage(query, chatId);
    },
    [handleSendMessage, chatId]
  );

  const handleHtmlClick = useCallback(
    ({ html, messageId }: { html: string; messageId: string }) => {
      setSelectedHtml({ html, messageId });
    },
    []
  );

  const messages = getOrderedMessages();

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="absolute top-4 right-8 z-50">
        <ThemeToggle />
      </div>

      {/* <header className="border-b px-4 h-[73px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
      </header> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {status === "error" && (
              <Alert variant="destructive" className="m-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to connect to the chat server. Please check your
                  connection and try again.
                </AlertDescription>
              </Alert>
            )}

            <MessageList
              messages={messages}
              isProcessing={isProcessing}
              onActionClick={handleActionClick}
              onActionHold={handleActionHold}
              onHtmlClick={handleHtmlClick}
            />

            <div
              className={cn(
                "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
                "border-b"
              )}
            >
              <div className="max-w-4xl mx-auto px-4 py-4">
                <InputArea
                  ref={inputRef}
                  onSendMessage={handleSendMessage}
                  disabled={status !== "connected" || isProcessing}
                />
              </div>
            </div>
          </div>
          {selectedHtml && (
            <HtmlPanel
              messageId={selectedHtml.messageId}
              chatId={chatId}
              onClose={() => setSelectedHtml(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
