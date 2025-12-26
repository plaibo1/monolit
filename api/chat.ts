"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { ChatInfo, ShareType } from "@/types/chat";
import { fetcher } from "@/lib/fetcher";
import { API_BASE_URL } from "@/lib/consts";

export const useChat = (chatId: string) => {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/chats/${chatId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useGetChatInfo = (chatId: string) => {
  const url = `${API_BASE_URL}/chats/reports/${chatId}/info`;

  const { data, error, isLoading } = useSWR<ChatInfo>(url, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export const useChatPublish = (chatId: string) => {
  const url = `${API_BASE_URL}/chats/reports/${chatId}`;
  const infoUrl = `${url}/info`;
  const shareUrl = `${url}/share`;

  const { data, error, isLoading, mutate } = useSWR<ShareType>(
    infoUrl,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const {
    trigger,
    isMutating,
    error: mutationError,
  } = useSWRMutation(
    shareUrl,
    (shareUrl, { arg }: { arg: { shared: boolean } }) =>
      fetcher(shareUrl, { method: "POST", body: JSON.stringify(arg) })
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
