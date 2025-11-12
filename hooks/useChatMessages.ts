"use client";

import { useState, useCallback } from "react";
import type { ActionButton, ChatMessage, ExecutionStep } from "@/types/chat";

export function useChatMessages() {
  const [messages, setMessages] = useState<Map<string, ChatMessage>>(new Map());
  const [messageOrder, setMessageOrder] = useState<string[]>([]);

  const addMessage = useCallback((message: ChatMessage) => {
    console.log("🚀 ~ useChatMessages ~ message:", message);
    setMessages((prev) => {
      const newMap = new Map(prev);
      newMap.set(message.id, message);
      return newMap;
    });
    setMessageOrder((prev) => [...prev, message.id]);
  }, []);

  const updateMessage = useCallback(
    (id: string, updates: Partial<ChatMessage>) => {
      setMessages((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(id);
        if (existing) {
          newMap.set(id, { ...existing, ...updates });
        }
        return newMap;
      });
    },
    []
  );

  const addActionToMessage = useCallback(
    (messageId: string, action: ActionButton) => {
      setMessages((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(messageId);
        if (existing) {
          newMap.set(messageId, {
            ...existing,
            actions: [...(existing.actions || []), action],
          });
        }
        return newMap;
      });
    },
    []
  );

  const addStepToMessage = useCallback(
    (messageId: string, step: ExecutionStep) => {
      setMessages((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(messageId);
        if (existing) {
          newMap.set(messageId, {
            ...existing,
            steps: [...(existing.steps || []), step],
          });
        }
        return newMap;
      });
    },
    []
  );

  const updateStepInMessage = useCallback(
    (messageId: string, stepId: string, updates: Partial<ExecutionStep>) => {
      setMessages((prev) => {
        const newMap = new Map(prev);
        const existing = newMap.get(messageId);
        if (existing && existing.steps) {
          const updatedSteps = existing.steps.map((step) =>
            step.id === stepId ? { ...step, ...updates } : step
          );
          newMap.set(messageId, {
            ...existing,
            steps: updatedSteps,
          });
        }
        return newMap;
      });
    },
    []
  );

  const clearMessages = useCallback(() => {
    setMessages(new Map());
    setMessageOrder([]);
  }, []);

  const getOrderedMessages = useCallback((): ChatMessage[] => {
    return messageOrder
      .map((id) => messages.get(id))
      .filter(Boolean) as ChatMessage[];
  }, [messages, messageOrder]);

  return {
    messages,
    messageOrder,
    addMessage,
    updateMessage,
    addActionToMessage,
    addStepToMessage,
    updateStepInMessage,
    clearMessages,
    getOrderedMessages,
  };
}
