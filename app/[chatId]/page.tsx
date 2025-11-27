"use client";

import { ChatInterface } from "@/components/Chat/ChatInterface";
import { ChatLayout } from "@/components/Chat/ChatLayout";
import { use } from "react";

type PageProps = {
  params: Promise<{ chatId: string }>;
};

export default function ChatPage({ params }: PageProps) {
  const chatId = use(params);

  return (
    <ChatLayout>
      <ChatInterface chatId={chatId.chatId} />
    </ChatLayout>
  );
}
