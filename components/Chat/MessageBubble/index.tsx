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
import { ActionHeader } from "../ActionHeader";

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
  const isFollowUp = message.type === "assistant_message_follow_up";

  const renderMessageContent = () => {
    if (isUnknown) {
      return (
        <UnknownMessage content={message.content} rawData={message.rawData} />
      );
    }

    if (isUser) {
      return <UserMessage content={message.content} />;
    }

    if (isFollowUp) {
      return <ActionHeader />;
    }

    return <AgentMessageContent content={message.content} isEmpty={isEmpty} />;
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

        {/* Временное решение чтобы рисовать только под ExecutionSteps */}
        {!isUser && !message.actions?.length && !isEmpty && (
          <HtmlMessage message={message} />
        )}

        {!isUser && (
          <MessageActions
            actions={message.actions}
            onActionClick={onActionClick}
            onActionHold={onActionHold}
          />
        )}
      </div>
    </div>
  );
}
