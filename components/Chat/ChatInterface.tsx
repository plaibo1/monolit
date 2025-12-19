"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { ChatMessageHandler } from "@/lib/message-handler";
import { MessageList } from "./MessageList";
import { InputArea, type InputAreaRef } from "./InputArea";
import { HtmlPanel } from "./HtmlPanel";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getWebSocketUrl, sendMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { MessageListHeader } from "./MessageList/MessageListHeader";
import { useChatStore } from "@/store/useChatStore";

type ChatInterfaceProps = {
  chatId: string;
};

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [selectedHtml, setSelectedHtml] = useState<{
    html: string;
    messageId: string;
  } | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const inputRef = useRef<InputAreaRef>(null);

  const {
    isProcessing,
    addMessage,
    updateMessage,
    addActionToMessage,
    addStepToMessage,
    updateStepInMessage,
    getOrderedMessages,
    clearMessages,
    onTaskStart,
    onTaskEnd,
  } = useChatStore();

  const handleWebSocketMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      const handler = new ChatMessageHandler({
        onUserMessage: addMessage,
        onAssistantMessage: (message) => {
          addMessage(message, true);
        },
        onUpdateAssistantMessage: updateMessage,
        onStep: addStepToMessage,
        onUpdateStep: updateStepInMessage,
        onAction: addActionToMessage,
        onTaskStart,
        onTaskEnd,
        onFirstInteraction: (data) => {
          // setThreadId(data.thread_id);
        },
        onClearAsk: () => {
          // Handle clear ask if needed
        },
        onClearCallFn: () => {
          // Handle clear call function if needed
        },
        onUnknownMessage: addMessage,
      });

      handler.handleMessage(data);
    },
    [
      addMessage,
      updateMessage,
      addActionToMessage,
      addStepToMessage,
      updateStepInMessage,
    ]
  );

  const websocketUrl = getWebSocketUrl(chatId);

  const { status, reconnect } = useWebSocket({
    url: websocketUrl,
    onMessage: handleWebSocketMessage,
  });

  useEffect(() => {
    const handler = () => {
      if (status === "disconnected") {
        reconnect();
        clearMessages();
      }
    };

    window.addEventListener("focus", handler);

    return () => {
      window.removeEventListener("focus", handler);
    };
  }, [status, reconnect]);

  useEffect(() => {
    return () => {
      clearMessages();
    };
  }, []);

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
      handleSendMessage(query, chatId);
    },
    [handleSendMessage, chatId]
  );

  const handleHtmlClick = useCallback(
    ({ html, messageId }: { html: string; messageId: string }) => {
      setSelectedHtml({ html, messageId });
      setIsPanelOpen(true);
    },
    []
  );

  const messages = getOrderedMessages();

  return (
    <div className="flex h-screen bg-background max-h-screen">
      {status === "error" && (
        <Alert
          variant="destructive"
          className="absolute top-12 left-0 right-0 m-4 z-50 max-w-[90%] sm:max-w-fit mx-auto"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to connect to the chat server. Please check your connection
            and try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 flex flex-col relative w-full max-w-full max-h-screen">
        <div className="relative flex-1">
          <MessageList
            header={<MessageListHeader connectionStatus={status} />}
            messages={messages}
            isProcessing={isProcessing}
            onActionClick={handleActionClick}
            onActionHold={handleActionHold}
            onHtmlClick={handleHtmlClick}
          />

          <div
            className={cn(
              "w-full absolute bottom-0 left-0 pt-16 pb-4 px-4 sm:px-0 bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_30%,transparent_100%)] flex-1"
            )}
          >
            <div className="mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl ">
              <InputArea
                ref={inputRef}
                onSendMessage={handleSendMessage}
                disabled={status !== "connected" || isProcessing}
              />
            </div>
          </div>
        </div>
      </div>

      <HtmlPanel
        messageId={selectedHtml?.messageId ?? ""}
        chatId={chatId}
        open={isPanelOpen}
        onOpenChange={setIsPanelOpen}
      />
    </div>
  );
}
