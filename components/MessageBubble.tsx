import type { ChatMessage } from "@/types/chat";
import { formatTimestamp } from "@/lib/message-utils";
import { ActionButtons } from "./ActionButtons";
import { AlertCircle, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { StepItem } from "./StepItem";
import { MessageSkeleton } from "./MessageSkeleton";
import { MarkdownContent } from "./MarkdownContent";

type MessageBubbleProps = {
  message: ChatMessage;
  onActionClick: (query: string) => void;
};

export function MessageBubble({ message, onActionClick }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";
  const isEmpty = !message.content || message.content.trim() === "";

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
              : isUnknown
              ? "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900"
              : message.isError
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-muted text-foreground"
          }`}
        >
          {isUnknown && (
            <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Unknown Message</span>
            </div>
          )}

          {message.isError && !isUnknown && (
            <div className="flex items-center gap-2 mb-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Error</span>
            </div>
          )}

          {isEmpty && !isUser && !isUnknown ? (
            <MessageSkeleton />
          ) : isUnknown ? (
            <div className="space-y-2">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {message.content}
              </p>
              <div className="mt-2">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                  Raw message data:
                </p>
                <pre className="bg-amber-100 dark:bg-amber-950/40 rounded p-2 text-xs overflow-x-auto border border-amber-200 dark:border-amber-900">
                  <code className="text-amber-900 dark:text-amber-300">
                    {JSON.stringify(message.rawData, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          ) : isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownContent content={message.content} />
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
