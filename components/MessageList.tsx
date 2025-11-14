"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";

type MessageListProps = {
  messages: ChatMessage[];
  isProcessing: boolean;
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
};

export function MessageList({
  messages,
  isProcessing,
  onActionClick,
  onActionHold,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  if (messages.length === 0 && !isProcessing) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h3 className="text-lg font-semibold mb-2">
            Welcome to DataLayer AI Assistant
          </h3>
          <p className="text-sm text-muted-foreground">
            Start a conversation by typing your question below. I can help you
            with data queries, analysis, and more.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
      <div className="space-y-4 max-w-4xl mx-auto">
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
