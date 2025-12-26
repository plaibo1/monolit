import { DefaultResponse } from ".";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SocketMessage = AgentMessage | UserMessage;

// User messages (simple text)
export type UserMessage = {
  type: "user";
  message: {
    text: string;
  };
};

// Agent messages (multiple event types)
export type AgentMessage = {
  type: "agent";
  message_id?: string | undefined;
  message: [AgentEventType, AgentPayload];
};

export type AgentEventType =
  | "task_start"
  | "task_end"
  | "new_message"
  | "update_message"
  | "first_interaction"
  | "clear_ask"
  | "clear_call_fn"
  | "action";

// Payloads for different event types
export type AgentPayload =
  | TaskPayload
  | MessagePayload
  | FirstInteractionPayload
  | ActionPayload
  | EmptyPayload;

export type EmptyPayload = Record<string, never>;

export type TaskPayload = EmptyPayload;

export type FirstInteractionPayload = {
  interaction: string;
  thread_id: string;
};

export type MessageTypes =
  | "run"
  | "assistant_message"
  | "assistant_message_follow_up"
  | "tool_message"
  | "undefined"
  | "final_html";

export type MessagePayload = {
  id: string;
  name: string;
  output: string;
  type: MessageTypes;
  parentId: string | null;
  threadId: string;
  createdAt: string;
  start: string;
  end: string | null;
  streaming: boolean;
  isError: boolean;
  showInput: boolean | string;
  input: string;
  defaultOpen: boolean;
  language?: string | null;
  metadata?: Record<string, any>;
  tags?: string[] | null;
  generation?: any | null;
  command?: any | null;
  waitForAnswer?: boolean;
};

export type ActionPayload = {
  id: string;
  forId: string;
  name: string;
  label: string;
  icon: string | null;
  tooltip: string;
  payload: {
    query?: string;
    [key: string]: any;
  };
};

// Internal message types for UI
export type ChatMessage = {
  id: string;
  role: "user" | "agent" | "unknown";
  content: string;
  timestamp: string;
  isError?: boolean;
  streaming?: boolean;
  actions?: ActionButton[];
  steps?: ExecutionStep[];
  rawData?: any; // Store raw message data for unknown messages
  type?: MessageTypes;
  messageBlockId?: string;
};

export type ExecutionStep = {
  id: string;
  name: string;
  type: "intention" | "planning" | "tool" | "html" | "other";
  input?: string;
  output: string;
  timestamp: string;
  isComplete: boolean;
  isError?: boolean;
  showInput?: boolean;
  language?: string | null;
};

export type ActionButton = {
  id: string;
  label: string;
  icon: string | null;
  tooltip: string;
  query: string;
};

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export type ChatHistoryItem = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatHistoryItemResponse = {
  chat_id: string;
  short_name: string;
  created_at: string;
  updated_at: string;
};

export type ChatsHistory = {
  status: number;
  data: {
    chats: ChatHistoryItemResponse[];
    pagination: {
      page: number;
      page_size: number;
      total: number;
      total_pages: number;
      has_more: boolean;
    };
  };
};

export type ShareType = {
  shared: boolean;
  can_read: boolean;
  can_modify: boolean;
};

export type ShareDashboardResponse = DefaultResponse<ShareType>;
export type ShareChatResponse = DefaultResponse<ShareType>;
