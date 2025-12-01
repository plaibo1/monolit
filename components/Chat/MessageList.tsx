"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import { TypingIndicator } from "./TypingIndicator";
import { ChatLoader } from "./ChatLoader";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBubble } from "./MessageBubble";

type MessageListProps = {
  messages: ChatMessage[];
  isProcessing: boolean;
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
  onHtmlClick?: ({
    html,
    messageId,
  }: {
    html: string;
    messageId: string;
  }) => void;
  header?: React.ReactNode;
};

export function MessageList({
  messages,
  isProcessing,
  onActionClick,
  onActionHold,
  onHtmlClick,
  header,
}: MessageListProps) {
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
    <ScrollArea className="h-screen overflow-y-auto" ref={scrollRef}>
      {header}
      <div className="space-y-4 max-w-4xl mx-auto py-6 md:py-20 lg:py-36">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onActionClick={onActionClick}
            onActionHold={onActionHold}
            onHtmlClick={onHtmlClick}
          />
        ))}
        {isProcessing && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}
