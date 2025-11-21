import { API_BASE_URL, WS_URL } from "./consts";

export type SendMessageResponse = {
  status: number;
  data: {
    chatId: string;
  };
};

export async function sendFirstMessage(
  text: string
): Promise<SendMessageResponse> {
  const response = await fetch(`${API_BASE_URL}/chats/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export function getWebSocketUrl(chatId: string): string {
  return `${WS_URL}/chats/ws/${chatId}`;
}
