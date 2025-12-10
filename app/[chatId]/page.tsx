"use client";

import { useGetChatPublishStatus } from "@/api/chat";
import { ChatInterface } from "@/components/Chat";
import { useAuth } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";

type PageProps = {
  params: Promise<{ chatId: string }>;
};

export default function ChatPage({ params }: PageProps) {
  const { chatId } = use(params);

  const { isAuthenticated, isLoading } = useAuth();
  const { data, isLoading: isLoadingChat } = useGetChatPublishStatus(chatId);

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoading &&
      !isLoadingChat &&
      !data?.data.can_read
    ) {
      redirect("/");
    }
  }, [isAuthenticated, isLoading, isLoadingChat, data]);

  return <ChatInterface chatId={chatId} />;
}
