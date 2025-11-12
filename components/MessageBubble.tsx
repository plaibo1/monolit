import type { ChatMessage } from "@/types/chat";
import { formatTimestamp } from "@/lib/message-utils";
import { ActionButtons } from "./ActionButtons";
import { AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { StepItem } from "./StepItem";

type MessageBubbleProps = {
  message: ChatMessage;
  onActionClick: (query: string) => void;
};

export function MessageBubble({ message, onActionClick }: MessageBubbleProps) {
  console.log("🚀 ~ MessageBubble ~ message:", message);
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`max-w-[80%] ${
          isUser ? "items-end" : "items-start"
        } flex flex-col gap-1`}
      >
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : message.isError
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-muted text-foreground"
          }`}
        >
          {message.isError && (
            <div className="flex items-center gap-2 mb-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Error</span>
            </div>
          )}

          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.steps && message.steps.length > 0 && (
          <div className="w-full space-y-2 mt-2">
            <div className="text-xs font-medium text-muted-foreground px-2">
              Execution Steps
            </div>
            {message.steps.map((step) => (
              <StepItem key={step.id} step={step} />
            ))}
          </div>
        )}

        <span className="text-xs text-muted-foreground px-2">
          {formatTimestamp(message.timestamp)}
        </span>

        {!isUser && message.actions && message.actions.length > 0 && (
          <ActionButtons
            actions={message.actions}
            onActionClick={onActionClick}
          />
        )}
      </div>
    </div>
  );
}
