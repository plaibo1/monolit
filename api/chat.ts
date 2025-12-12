"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { ShareType } from "@/types/chat";
import { fetcher } from "@/lib/fetcher";

export const useGetChatPublishStatus = (chatId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/reports/${chatId}/share`;

  const { data, error, isLoading } = useSWR<ShareType>(url, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export const useChatPublish = (chatId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/reports/${chatId}/share`;

  const { data, error, isLoading, mutate } = useSWR<ShareType>(url, fetcher, {
    revalidateOnFocus: false,
  });

  const {
    trigger,
    isMutating,
    error: mutationError,
  } = useSWRMutation(url, (url, { arg }: { arg: { shared: boolean } }) =>
    fetcher(url, { method: "POST", body: JSON.stringify(arg) })
  );

  const publish = (shared: boolean) =>
    trigger({ shared }, { revalidate: false }).then(() => {
      mutate({ ...data, shared } as ShareType, { revalidate: false });
    });

  return {
    data,
    error: error || mutationError,
    isLoading: isLoading || isMutating,
    publish,
  };
};
