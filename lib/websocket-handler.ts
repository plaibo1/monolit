import type {
  SocketMessage,
  AgentMessage,
  UserMessage,
  MessagePayload,
  ActionPayload,
  FirstInteractionPayload,
  ChatMessage,
  ExecutionStep,
  ActionButton,
} from "@/types/chat";
import {
  categorizeMessage,
  messagePayloadToChatMessage,
  messagePayloadToStep,
  actionPayloadToButton,
  generateId,
} from "./message-utils";

export type WebSocketHandlerCallbacks = {
  onUserMessage: (message: ChatMessage) => void;
  onAssistantMessage: (message: ChatMessage) => void;
  onUpdateAssistantMessage: (id: string, updates: Partial<ChatMessage>) => void;
  onStep: (step: ExecutionStep) => void;
  onUpdateStep: (id: string, updates: Partial<ExecutionStep>) => void;
  onAction: (messageId: string, action: ActionButton) => void;
  onTaskStart: () => void;
  onTaskEnd: () => void;
  onFirstInteraction: (data: FirstInteractionPayload) => void;
  onClearAsk: () => void;
  onClearCallFn: () => void;
  onUnknownMessage: (message: ChatMessage) => void; // Added callback for unknown messages
};

export class WebSocketMessageHandler {
  private callbacks: WebSocketHandlerCallbacks;

  constructor(callbacks: WebSocketHandlerCallbacks) {
    this.callbacks = callbacks;
  }

  handleMessage(data: [SocketMessage] | unknown) {
    try {
      // Validate basic structure
      if (!data || !Array.isArray(data) || data?.length === 0) {
        this.handleUnknownMessage(data, "Invalid message structure");
        return;
      }

      data.forEach((message) => {
        // Check if message has required type field
        if (!message || typeof message !== "object" || !message.type) {
          this.handleUnknownMessage(message, "Missing or invalid message type");
          return;
        }

        if (message.type === "system") {
          if (message.message?.text === "start_processing") {
            this.callbacks.onTaskStart();
            return;
          }

          if (message.message?.text === "finish_processing_success") {
            this.callbacks.onTaskEnd();
            return;
          }

          // System messages like "start_processing" can be logged or ignored
          console.log("[v0] System message:", message.message?.text);
          return;
        }

        // Process known message types
        if (message.type === "user") {
          this.handleUserMessage(message as UserMessage);
        } else if (message.type === "agent") {
          this.handleAgentMessage(message as AgentMessage);
        } else {
          // Unknown message type
          this.handleUnknownMessage(
            message,
            `Unknown message type: ${message.type}`
          );
        }
      });
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        this.handleUnknownMessage(
          error,
          `Error processing message: ${error.message}`
        );
      } else {
        this.handleUnknownMessage(error, `Error processing message: ${error}`);
      }
    }
  }

  private handleUnknownMessage(rawData: any, reason: string) {
    console.warn("[v0] Unknown message received:", reason, rawData);

    const unknownMessage: ChatMessage = {
      id: generateId(),
      role: "unknown",
      content: reason,
      timestamp: new Date().toISOString(),
      rawData: rawData,
    };

    this.callbacks.onUnknownMessage(unknownMessage);
  }

  private handleUserMessage(data: UserMessage) {
    const message: ChatMessage = {
      id: generateId(),
      role: "user",
      content: data.message.text,
      timestamp: new Date().toISOString(),
    };
    this.callbacks.onUserMessage(message);
  }

  private handleAgentMessage(data: AgentMessage) {
    const [eventType, payload] = data.message;

    switch (eventType) {
      case "task_start":
        this.callbacks.onTaskStart();
        break;

      case "task_end":
        this.callbacks.onTaskEnd();
        break;

      case "new_message":
        this.handleNewMessage(payload as MessagePayload);
        break;

      case "update_message":
        this.handleUpdateMessage(payload as MessagePayload);
        break;

      case "first_interaction":
        this.callbacks.onFirstInteraction(payload as FirstInteractionPayload);
        break;

      case "action":
        this.handleAction(payload as ActionPayload);
        break;

      case "clear_ask":
        this.callbacks.onClearAsk();
        break;

      case "clear_call_fn":
        this.callbacks.onClearCallFn();
        break;
    }
  }

  private handleNewMessage(payload: MessagePayload) {
    const category = categorizeMessage(payload);

    if (category === "chat") {
      const message = messagePayloadToChatMessage(payload);
      this.callbacks.onAssistantMessage(message);
    } else if (category === "step") {
      const step = messagePayloadToStep(payload);
      this.callbacks.onStep(step);
    }
  }

  private handleUpdateMessage(payload: MessagePayload) {
    const category = categorizeMessage(payload);

    if (category === "chat") {
      this.callbacks.onUpdateAssistantMessage(payload.id, {
        content: payload.output,
        streaming: payload.streaming,
        isError: payload.isError,
      });
    } else if (category === "step") {
      this.callbacks.onUpdateStep(payload.id, {
        output: payload.output,
        isComplete: payload.end !== null,
        isError: payload.isError,
      });
    }
  }

  private handleAction(payload: ActionPayload) {
    const action = actionPayloadToButton(payload);
    this.callbacks.onAction(payload.forId, action);
  }
}
