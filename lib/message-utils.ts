import type {
  MessagePayload,
  ExecutionStep,
  ChatMessage,
  ActionButton,
  ActionPayload,
} from "@/types/chat";

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function categorizeMessage(
  payload: MessagePayload
): "chat" | "step" | "ignore" {
  if (payload.type === "assistant_message") {
    return "chat";
  }

  if (
    payload.name === "Intention Detection" ||
    payload.name === "Planning" ||
    payload.name?.startsWith("Tool:")
  ) {
    return "step";
  }

  // Run and undefined types can be steps
  if (payload.type === "undefined" || payload.type === "run") {
    return "step";
  }

  return "ignore";
}

export function messagePayloadToChatMessage(
  payload: MessagePayload
): ChatMessage {
  return {
    id: payload.id,
    role: "agent",
    content: payload.output,
    timestamp: payload.createdAt,
    isError: payload.isError,
    streaming: payload.streaming,
    actions: [],
  };
}

export function messagePayloadToStep(payload: MessagePayload): ExecutionStep {
  let type: ExecutionStep["type"] = "other";

  if (payload.name === "Intention Detection") {
    type = "intention";
  } else if (payload.name === "Planning") {
    type = "planning";
  } else if (payload.name?.startsWith("Tool:")) {
    type = "tool";
  }

  return {
    id: payload.id,
    name: payload.name,
    type,
    input: payload.input,
    output: payload.output,
    timestamp: payload.createdAt,
    isComplete: payload.end !== null,
    isError: payload.isError,
    showInput: Boolean(payload.showInput),
    language: payload.language,
  };
}

export function actionPayloadToButton(payload: ActionPayload): ActionButton {
  return {
    id: payload.id,
    label: payload.label,
    icon: payload.icon,
    tooltip: payload.tooltip,
    query: payload.payload.query || "",
  };
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) {
    return "Just now";
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  } else {
    return date.toLocaleDateString();
  }
}
