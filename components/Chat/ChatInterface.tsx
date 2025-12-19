"use client";

import { useState, useCallback, useRef } from "react";
import { MessageList } from "./MessageList";
import { InputArea, type InputAreaRef } from "./InputArea";
import { HtmlPanel } from "./HtmlPanel";
import { sendMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { MessageListHeader } from "./MessageList/MessageListHeader";
import { ChatCore } from "./ChatCore";

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

  // TODO: get status from store
  const status = "connected";

  return (
    <div className="flex h-screen bg-background max-h-screen">
      {chatId && <ChatCore />}

      <div className="flex-1 flex flex-col relative w-full max-w-full max-h-screen">
        <div className="relative flex-1">
          <MessageList
            header={<MessageListHeader connectionStatus={status} />}
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
                // disabled={status !== "connected" || isProcessing}
                disabled={status !== "connected" || false}
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
