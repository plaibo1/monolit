"use client";

import { ChatInterface } from "@/components/Chat";
import { useAuth } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";

type PageProps = {
  params: Promise<{ chatId: string }>;
};

export default function ChatPage({ params }: PageProps) {
  const chatId = use(params);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return <ChatInterface chatId={chatId.chatId} />;
}
