"use client";

import { ChatInterface } from "@/components/Chat";
import { use } from "react";

type PageProps = {
  params: Promise<{ chatId: string }>;
};

export default function ChatPage({ params }: PageProps) {
  const chatId = use(params);

  return <ChatInterface chatId={chatId.chatId} />;
}
