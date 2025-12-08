import useSWR, { mutate } from "swr";
import { useCallback } from "react";
import {
  type ChatHistoryItemResponse,
  type ChatHistoryItem,
} from "@/types/chat";
import { API_BASE_URL } from "@/lib/consts";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }

  const data = await response.json();

  if (data.status !== 200) {
    throw new Error("Failed to fetch chat history");
  }

  return data.data.chats.map((chat: ChatHistoryItemResponse) => ({
    id: chat.chat_id,
    name: chat.short_name,
    createdAt: chat.created_at,
    updatedAt: chat.updated_at,
  }));
};

export function useChatHistory() {
  const {
    data: history = [],
    error,
    isLoading,
  } = useSWR<ChatHistoryItem[]>(`${API_BASE_URL}/chats/list`, fetcher, {
    revalidateOnFocus: false, // Optional: customize SWR options as needed
  });

  const refreshHistory = useCallback(async () => {
    try {
      await mutate(`${API_BASE_URL}/chats/list`);
    } catch (error) {
      console.error("Failed to refresh chat history:", error);
    }
  }, []);

  const deleteChat = useCallback(
    (id: string) => {
      // Store current history for rollback
      const currentHistory = history;

      // Optimistic update - remove from UI immediately
      mutate(
        `${API_BASE_URL}/chats/list`,
        (currentHistory: ChatHistoryItem[] | undefined) => {
          return currentHistory
            ? currentHistory.filter((chat) => chat.id !== id)
            : [];
        },
        false // Do not revalidate immediately
      );

      // Delay actual deletion by 10 seconds
      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/chats/${id}/delete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to delete chat");
          }

          const data = await response.json();

          if (data.status !== 200) {
            throw new Error(data.error || "Failed to delete chat");
          }

          // Revalidate to ensure consistency
          await mutate(`${API_BASE_URL}/chats/list`);
        } catch (error) {
          console.error("Failed to delete chat:", error);
          // Rollback optimistic update on error
          mutate(`${API_BASE_URL}/chats/list`, currentHistory, false);
        }
      }, 10000); // 10 seconds delay

      // Return cancel function for undo
      return () => {
        clearTimeout(timeoutId);
        // Restore the chat in UI
        mutate(`${API_BASE_URL}/chats/list`, currentHistory, false);
      };
    },
    [history]
  );

  const getChatById = useCallback(
    (id: string) => {
      return history.find((chat) => chat.id === id);
    },
    [history]
  );

  return {
    history,
    isLoading,
    isError: error,
    refreshHistory,
    deleteChat,
    getChatById,
  };
}

export const useRevalidateChatHistory = () => {
  const { mutate } = useSWR(`${API_BASE_URL}/chats/list`, fetcher);

  return mutate;
};
