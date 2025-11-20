"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatHistoryItem } from "@/types/chat";
import { API_BASE_URL } from "@/lib/consts";

export function useChatHistory() {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history from API on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/chats`);
        if (!response.ok) throw new Error("Failed to fetch chat history");
        const data = await response.json();
        // Map API response to our format
        const mappedHistory = data.map(
          (chat: { id: string; createDate: string; name: string }) => ({
            id: chat.id,
            name: chat.name,
            createdAt: chat.createDate,
            updatedAt: chat.createDate,
          })
        );
        setHistory(mappedHistory);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const refreshHistory = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chats`);
      if (!response.ok) throw new Error("Failed to fetch chat history");
      const data = await response.json();
      const mappedHistory = data.map(
        (chat: { id: string; createDate: string; name: string }) => ({
          id: chat.id,
          name: chat.name,
          createdAt: chat.createDate,
          updatedAt: chat.createDate,
        })
      );
      setHistory(mappedHistory);
    } catch (error) {
      console.error("Failed to refresh chat history:", error);
    }
  }, []);

  const deleteChat = useCallback((id: string) => {
    // TODO: Implement API call for deletion
    console.log("[v0] Mock delete chat:", id);
    setHistory((prev) => prev.filter((chat) => chat.id !== id));
  }, []);

  const getChatById = useCallback(
    (id: string) => {
      return history.find((chat) => chat.id === id);
    },
    [history]
  );

  return {
    history,
    isLoading,
    refreshHistory,
    deleteChat,
    getChatById,
  };
}
