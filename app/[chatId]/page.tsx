import { ChatInterface } from "@/components/Chat/ChatInterface";
import { ChatLayout } from "@/components/Chat/ChatLayout";

type PageProps = {
  params: Promise<{ chatId: string }>;
};

export default async function ChatPage({ params }: PageProps) {
  const { chatId } = await params;

  return (
    <ChatLayout>
      <ChatInterface chatId={chatId} />
    </ChatLayout>
  );
}
