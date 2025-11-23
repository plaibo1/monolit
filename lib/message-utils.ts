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
  if (payload.type === "assistant_message" || payload.type === "final_html") {
    return "chat";
  }

  // All "run" types are steps
  if (payload.type === "run") {
    return "step";
  }

  // Backward compatibility for undefined type
  if (payload.type === "undefined") {
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
  const name = payload.name || "Unknown Step";

  // Categorize by name patterns
  if (name.includes("Intention Detection") || name.includes("Intention")) {
    type = "intention";
  } else if (name.includes("Planning")) {
    type = "planning";
  } else if (
    name.startsWith("Tool:") ||
    name.includes("query") ||
    name.includes("Query")
  ) {
    type = "tool";
  } else if (
    name.startsWith("HTML") ||
    name.includes("html") ||
    name.includes("HTML")
  ) {
    type = "html";
  } else if (
    name.includes("Reasoning") ||
    name.includes("Thinking") ||
    name.includes("Synthesis")
  ) {
    type = "other"; // These are thinking/reasoning steps
  }

  return {
    id: payload.id,
    name: name,
    type,
    input: payload.input || "",
    output: payload.output || "",
    timestamp: payload.createdAt || new Date().toISOString(),
    isComplete: payload.end !== null,
    isError: payload.isError || false,
    showInput: Boolean(payload.showInput),
    language: payload.language || null,
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
