import type { ChatMessage } from "@/types/chat";
import { getBubbleClasses } from "./utils/styles";
import { ANIMATION_CLASSES } from "./constants";
import { UserMessage } from "./components/UserMessage";
import { UnknownMessage } from "./components/UnknownMessage";
import { ErrorHeader } from "./components/ErrorHeader";
import { AgentMessageContent } from "./components/AgentMessageContent";
import { ExecutionSteps } from "./components/ExecutionSteps";
import { MessageActions } from "./components/MessageActions";

type MessageBubbleProps = {
  message: ChatMessage;
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
  onHtmlClick?: (params: { html: string; messageId: string }) => void;
};

export function MessageBubble({
  message,
  onActionClick,
  onActionHold,
  onHtmlClick,
}: MessageBubbleProps) {
  // Message type checks
  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";
  const isEmpty = !message.content || message.content.trim() === "";

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
        messageId={message.id}
        onHtmlClick={onHtmlClick}
      />
    );
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } ${ANIMATION_CLASSES}`}
    >
      <div
        className={`max-w-full ${
          isUser ? "items-end max-w-[80%]" : "items-start"
        } flex flex-col gap-1`}
      >
        <div className="relative group w-full">
          <div className={getBubbleClasses(message)}>
            <ErrorHeader show={message.isError === true && !isUnknown} />

            {renderMessageContent()}
          </div>
        </div>

        {!isUser && message.steps && <ExecutionSteps steps={message.steps} />}

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
