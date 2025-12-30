import { ShareDashboardResponse } from "@/types/chat";
import { API_BASE_URL, WS_URL } from "./consts";
import { isHesoyamCodeString } from "@/components/Chat/ChatDebugger/utils";

export type SendMessageResponse = {
  status: number;
  data: {
    chat_id: string;
  };
};

export async function sendMessage(
  text: string,
  chatId?: string
): Promise<SendMessageResponse> {
  const response = await fetch(`${API_BASE_URL}/chats/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      chat_id: chatId,
      ...((process.env.NEXT_PUBLIC_MESSAGE_DEBUG === "true" ||
        isHesoyamCodeString(text)) && {
        debug: true,
      }),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export function getWebSocketUrl(chatId: string): string {
  // return `ws://localhost:8000/chats/ws/chat1`; // default mocks
  // return `ws://localhost:8000/chats/ws/chat2`; // history mocks
  // return `ws://localhost:8000/chats/ws/chat3`; // html mocks // e82d0daa-378d-443b-ae1e-aaa580b9571b (my chat)

  return `${WS_URL}/chats/ws/${chatId}`;
}

export const getHtmlReportUrl = ({
  chatId,
  messageId,
}: {
  chatId: string;
  messageId: string;
}): string => {
  return `${API_BASE_URL}/chats/reports/${chatId}/${messageId}`;
};

export const publishDashboard = async ({
  chatId,
  messageId,
  shareStatus,
}: {
  chatId: string;
  messageId: string;
  shareStatus: boolean;
}) => {
  const data = await fetch(`${getHtmlReportUrl({ chatId, messageId })}/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      shared: shareStatus,
    }),
  });

  if (!data.ok) {
    throw new Error("Failed to publish dashboard");
  }

  return data.json();
};

export const getDashboardPublishStatus = async ({
  chatId,
  messageId,
}: {
  chatId: string;
  messageId: string;
}): Promise<ShareDashboardResponse> => {
  const data = await fetch(`${getHtmlReportUrl({ chatId, messageId })}/info`);

  if (!data.ok) {
    throw new Error("Failed to get dashboard publish status");
  }

  return data.json();
};
