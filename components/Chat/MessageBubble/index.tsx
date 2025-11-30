import type { ChatMessage } from "@/types/chat";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { getBubbleClasses } from "./utils/styles";
import { ANIMATION_CLASSES } from "./constants";
import { CopyButton } from "./components/CopyButton";
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
  const { copied, copyToClipboard } = useCopyToClipboard();

  // Message type checks
  const isUser = message.role === "user";
  const isUnknown = message.role === "unknown";
  const isHtml = message.type === "final_html";
  const isFollowUp = message.type === "assistant_message_follow_up";
  const isEmpty = !message.content || message.content.trim() === "";

  // Show copy button for non-HTML, non-follow-up messages
  const showCopyButton = !isHtml && !isFollowUp;

  const handleCopy = () => {
    copyToClipboard(message.content);
  };

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
            {showCopyButton && (
              <CopyButton copied={copied} onCopy={handleCopy} />
            )}

            <ErrorHeader show={message.isError === true && !isUnknown} />

            {renderMessageContent()}
          </div>
        </div>

        {!isUser && message.steps && <ExecutionSteps steps={message.steps} />}

        {message.type === "assistant_message" && (
          <>{/* HERE ACTIONS TO MESSAGE */}</>
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
