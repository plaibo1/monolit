import type { ChatMessage } from "@/types/chat";
import { BASE_BUBBLE_CLASSES, BUBBLE_VARIANTS } from "../constants";

export function getBubbleClasses(message: ChatMessage): string {
  if (message.type === "final_html") {
    return "";
  }

  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";

  if (isUser) {
    return `${BASE_BUBBLE_CLASSES} ${BUBBLE_VARIANTS.user}`;
  }

  if (isUnknown) {
    return `${BASE_BUBBLE_CLASSES} ${BUBBLE_VARIANTS.unknown}`;
  }

  if (message.isError) {
    return `${BASE_BUBBLE_CLASSES} ${BUBBLE_VARIANTS.error}`;
  }

  return BUBBLE_VARIANTS.agent;
}
