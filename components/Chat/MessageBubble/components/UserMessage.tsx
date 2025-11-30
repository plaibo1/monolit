type UserMessageProps = {
  content: string;
};

export function UserMessage({ content }: UserMessageProps) {
  return <p className="text-sm whitespace-pre-wrap">{content}</p>;
}
