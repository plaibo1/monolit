import type { ChatMessage } from "@/types/chat";
import { formatTimestamp } from "@/lib/message-utils";
import { ActionButtons } from "./ActionButtons";
import { AlertCircle, HelpCircle, Copy, Check } from "lucide-react";
import { StepItem } from "./StepItem";
import { MessageSkeleton } from "./MessageSkeleton";
import { MarkdownContent } from "./MarkdownContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HtmlMessage } from "./HtmlMessage";

type MessageBubbleProps = {
  message: ChatMessage;
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
  onHtmlClick?: ({
    html,
    messageId,
  }: {
    html: string;
    messageId: string;
  }) => void;
};

const getBubbleClasses = (message: ChatMessage) => {
  if (message.type === "final_html") {
    return "";
  }

  const baseClasses = "rounded-lg px-4 py-3";
  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";

  if (isUser) {
    return `${baseClasses} bg-primary text-primary-foreground`;
  }

  if (isUnknown) {
    return `${baseClasses} bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900`;
  }

  if (message.isError) {
    return `${baseClasses} bg-destructive/10 text-destructive border border-destructive/20`;
  }

  return `${baseClasses} bg-muted text-foreground`;
};

export function MessageBubble({
  message,
  onActionClick,
  onActionHold,
  onHtmlClick,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";
  const isHtml = message.type === "final_html";
  const isEmpty = !message.content || message.content.trim() === "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

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
        <div className="relative group w-full">
          <div className={getBubbleClasses(message)}>
            {!isHtml && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
                title="Copy message"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}

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

            {isEmpty && !isHtml && !isUser && !isUnknown ? (
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
            ) : isHtml ? (
              <HtmlMessage
                html={message.content}
                isLoading={isEmpty}
                onHtmlClick={onHtmlClick}
                messageId={message.id}
              />
            ) : (
              <MarkdownContent content={message.content} />
            )}
          </div>
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
            onActionHold={onActionHold}
          />
        )}
      </div>
    </div>
  );
}
