import type { ChatMessage } from "@/types/chat";
import { getBubbleClasses } from "./utils/styles";
import { ANIMATION_CLASSES } from "./constants";
import { UserMessage } from "./components/UserMessage";
import { UnknownMessage } from "./components/UnknownMessage";
import { ErrorHeader } from "./components/ErrorHeader";
import { AgentMessageContent } from "./components/AgentMessageContent";
import { ExecutionSteps } from "./components/ExecutionSteps";
import { MessageActions } from "./components/MessageActions";
import { cn } from "@/lib/utils";
import { HtmlMessage } from "./components/HtmlMessage";

type MessageBubbleProps = {
  message: ChatMessage;
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
};

export function MessageBubble({
  message,
  onActionClick,
  onActionHold,
}: MessageBubbleProps) {
  // Message type checks
  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";
  const isEmpty = !message.content || message.content.trim() === "";
  const isHtml = message.type === "final_html";

  const renderMessageContent = () => {
    if (isUnknown) {
      return (
        <UnknownMessage content={message.content} rawData={message.rawData} />
      );
    }

    if (isUser) {
      return <UserMessage content={message.content} />;
    }

    return (
      <AgentMessageContent
        content={message.content}
        isEmpty={isEmpty}
        messageType={message.type}
      />
    );
  };

  return (
    <div
      className={cn(`flex ${ANIMATION_CLASSES}`, {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={cn(`flex flex-col gap-2`, {
          "max-w-[80%]": isUser,
          "w-full max-w-full": !isUser,
        })}
      >
        <div className={getBubbleClasses(message)}>
          <ErrorHeader show={message.isError === true && !isUnknown} />

          {renderMessageContent()}
        </div>

        {!isUser && message.steps && (
          <ExecutionSteps
            steps={message.steps}
            messageId={message.messageBlockId}
          />
        )}

        {!isUser && (
          <MessageActions
            actions={message.actions}
            onActionClick={onActionClick}
            onActionHold={onActionHold}
          />
        )}

        {isHtml && <HtmlMessage message={message} isLoading={isEmpty} />}
      </div>
    </div>
  );
}
