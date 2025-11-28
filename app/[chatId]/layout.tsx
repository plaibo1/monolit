import { ChatLayout } from "@/components/Chat/ChatLayout";

export default function ChatWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatLayout>{children}</ChatLayout>;
}
