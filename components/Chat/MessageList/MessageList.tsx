"use client";

import { useEffect, useRef } from "react";
import { TypingIndicator } from "../TypingIndicator";
import { ChatLoader } from "../ChatLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "../MessageBubble";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { MessageListHeader } from "./MessageListHeader";
import { getOrderedMessages } from "@/store/useChatStore/utils";

type MessageListProps = {
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
};

export function MessageList({ onActionClick, onActionHold }: MessageListProps) {
  const isProcessing = useChatStore((state) => state.isProcessing);
  const messagesMap = useChatStore((state) => state.messages);
  const messageOrder = useChatStore((state) => state.messageOrder);

  const messages = getOrderedMessages(messagesMap, messageOrder);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  if (messages.length === 0 && !isProcessing) {
    return <ChatLoader />;
  }

  return (
    <ScrollArea className="h-screen" ref={scrollRef}>
      <MessageListHeader />
      <div
        className={cn(
          "relative w-full max-h-full space-y-4 px-4 pt-6 pb-28 mx-auto",
          "max-w-[100vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl md:py-20 lg:py-36"
        )}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onActionClick={onActionClick}
            onActionHold={onActionHold}
          />
        ))}
        {isProcessing && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}
