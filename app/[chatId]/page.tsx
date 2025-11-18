import { ChatInterface } from "@/components/ChatInterface";
import { ChatLayout } from "@/components/ChatLayout";

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
