import { MarkdownContent } from "../../MarkdownContent";
import { ActionHeader } from "../../ActionHeader";
import type { MessageTypes } from "@/types/chat";

type AgentMessageContentProps = {
  content: string;
  isEmpty: boolean;
  messageType?: MessageTypes;
};

export function AgentMessageContent({
  content,
  isEmpty,
  messageType,
}: AgentMessageContentProps) {
  const isHtml = messageType === "final_html";
  const isFollowUp = messageType === "assistant_message_follow_up";

  if (isEmpty && !isHtml) {
    return null;
  }

  if (isHtml) {
    return null;
  }

  if (isFollowUp) {
    return <ActionHeader />;
  }

  return <MarkdownContent content={content} isAgentMessage />;
}
