import { MarkdownContent } from "../../MarkdownContent";
import { HtmlMessage } from "../../HtmlMessage";
import { ActionHeader } from "../../ActionHeader";
import type { MessageTypes } from "@/types/chat";

type AgentMessageContentProps = {
  content: string;
  isEmpty: boolean;
  messageType?: MessageTypes;
  messageId: string;
  onHtmlClick?: (params: { html: string; messageId: string }) => void;
};

export function AgentMessageContent({
  content,
  isEmpty,
  messageType,
  messageId,
  onHtmlClick,
}: AgentMessageContentProps) {
  const isHtml = messageType === "final_html";
  const isFollowUp = messageType === "assistant_message_follow_up";

  if (isEmpty && !isHtml) {
    return null;
  }

  if (isHtml) {
    return (
      <HtmlMessage
        html={content}
        isLoading={isEmpty}
        onHtmlClick={onHtmlClick}
        messageId={messageId}
      />
    );
  }

  if (isFollowUp) {
    return <ActionHeader />;
  }

  return <MarkdownContent content={content} isAgentMessage />;
}
