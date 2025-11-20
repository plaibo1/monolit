import { API_BASE_URL, WS_URL } from "./consts";

export type SendMessageResponse = {
  success: boolean;
  chatId: string;
};

export async function sendFirstMessage(
  text: string
): Promise<SendMessageResponse> {
  const response = await fetch(`${API_BASE_URL}/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "user",
      message: {
        text,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export function getWebSocketUrl(chatId: string): string {
  return `${WS_URL}?chatId=${chatId}`;
}
