"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { ShareChatResponse } from "@/types/chat";
import { useParams } from "next/navigation";

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
};

export const useGetChatPublishStatus = (chatIdCandidate?: string) => {
  const chatIdParam = useParams<{ chatId: string }>();
  const chatId = chatIdCandidate || chatIdParam.chatId;

  const { data, error, isLoading, mutate } = useSWR<ShareChatResponse>(
    chatId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/reports/${chatId}/share`
      : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

async function publishChatFetcher(
  url: string,
  { arg }: { arg: { shared: boolean } }
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Failed to update chat publish status");
  }

  return response.json();
}

export const usePublishChat = (chatIdCandidate?: string) => {
  const { chatId: chatIdParam } = useParams<{ chatId: string }>();
  const chatId = chatIdCandidate ?? chatIdParam;

  const { mutate } = useGetChatPublishStatus(chatId);
  const { trigger, isMutating, error, data } = useSWRMutation(
    chatId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/reports/${chatId}/share`
      : null,
    publishChatFetcher
  );

  const publish = (shared: boolean) => trigger({ shared }).then(() => mutate());

  return {
    publish,
    isMutating,
    error,
    data,
  };
};
