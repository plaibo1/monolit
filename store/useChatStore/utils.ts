import { type ChatMessage } from "@/types/chat";

export const getOrderedMessages = (
  messagesMap: Map<string, ChatMessage>,
  messageOrder: string[]
) => {
  return messageOrder.reduce((acc, id) => {
    const message = messagesMap.get(id);
    if (message) {
      acc.push(message);
    }
    return acc;
  }, [] as ChatMessage[]);
};

export const addMessage = (message: ChatMessage) => {
  // >>>>>>>>>>>>>>>>>>>>>>
  // TODO: add message to store
  // >>>>>>>>>>>>>>>>>>>>>>
};
