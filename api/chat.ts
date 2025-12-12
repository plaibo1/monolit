"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { ShareType } from "@/types/chat";
import { fetcher } from "@/lib/fetcher";

export const useGetChatPublishStatus = (chatId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/reports/${chatId}/share`;

  const { data, error, isLoading } = useSWR<ShareType>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const usePublishChat = (chatId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/reports/${chatId}/share`;

  const { trigger, isMutating, error, data } = useSWRMutation(
    url,
    (url, { arg }: { arg: { shared: boolean } }) =>
      fetcher(url, { method: "POST", body: JSON.stringify(arg) })
  );

  const publish = (shared: boolean) => trigger({ shared });

  return {
    publish,
    isMutating,
    error,
    data,
  };
};
