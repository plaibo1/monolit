"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatLoader } from "./ChatLoader";

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
};

export function MessageList({
  messages,
  isProcessing,
  onActionClick,
  onActionHold,
  onHtmlClick,
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
    <div className="flex-1 overflow-y-auto" ref={scrollRef}>
      <div className="space-y-4 max-w-4xl mx-auto py-6">
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
    </div>
  );
}
