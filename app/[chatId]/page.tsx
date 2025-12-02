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

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      redirect("/");
    }
  }, [isAuthenticated, isLoading]);

  return <ChatInterface chatId={chatId.chatId} />;
}
