import { create } from "zustand";
import type { ActionButton, ChatMessage, ExecutionStep } from "@/types/chat";

interface ChatState {
  messages: Map<string, ChatMessage>;
  messageOrder: string[];
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  addActionToMessage: (messageId: string, action: ActionButton) => void;
  addStepToMessage: (messageId: string, step: ExecutionStep) => void;
  updateStepInMessage: (
    messageId: string,
    stepId: string,
    updates: Partial<ExecutionStep>
  ) => void;
  loadHistory: (history: ChatMessage[]) => void;
  clearMessages: () => void;
  getOrderedMessages: () => ChatMessage[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: new Map(),
  messageOrder: [],

  addMessage: (message: ChatMessage) => {
    set((state) => {
      const newMap = new Map(state.messages);
      newMap.set(message.id, message);
      return {
        messages: newMap,
        messageOrder: [...state.messageOrder, message.id],
      };
    });
  },

  updateMessage: (id: string, updates: Partial<ChatMessage>) => {
    set((state) => {
      const newMap = new Map(state.messages);
      const existing = newMap.get(id);
      if (existing) {
        newMap.set(id, { ...existing, ...updates });
      }
      return { messages: newMap };
    });
  },

  addActionToMessage: (messageId: string, action: ActionButton) => {
    set((state) => {
      const newMap = new Map(state.messages);
      const existing = newMap.get(messageId);
      if (existing) {
        newMap.set(messageId, {
          ...existing,
          actions: [...(existing.actions || []), action],
        });
      }
      return { messages: newMap };
    });
  },

  addStepToMessage: (messageId: string, step: ExecutionStep) => {
    set((state) => {
      const newMap = new Map(state.messages);
      const existing = newMap.get(messageId);

      if (existing) {
        newMap.set(messageId, {
          ...existing,
          steps: [...(existing.steps || []), step],
        });
      }
      return { messages: newMap };
    });
  },

  updateStepInMessage: (
    messageId: string,
    stepId: string,
    updates: Partial<ExecutionStep>
  ) => {
    set((state) => {
      const newMap = new Map(state.messages);
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
      return { messages: newMap };
    });
  },

  loadHistory: (history: ChatMessage[]) => {
    const newMessages = new Map<string, ChatMessage>();
    const newOrder: string[] = [];

    history.forEach((message) => {
      newMessages.set(message.id, message);
      newOrder.push(message.id);
    });

    set({ messages: newMessages, messageOrder: newOrder });
  },

  clearMessages: () => {
    set({ messages: new Map(), messageOrder: [] });
  },

  getOrderedMessages: () => {
    const { messages, messageOrder } = get();

    return messageOrder.reduce((acc, id) => {
      const message = messages.get(id);
      if (message) {
        acc.push(message);
      }
      return acc;
    }, [] as ChatMessage[]);
  },
}));
