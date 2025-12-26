import { MarkdownContent } from "../../MarkdownContent";

type AgentMessageContentProps = {
  content: string;
  isEmpty: boolean;
};

export function AgentMessageContent({
  content,
  isEmpty,
}: AgentMessageContentProps) {
  if (isEmpty) {
    return null;
  }

  return <MarkdownContent content={content} isAgentMessage />;
}
