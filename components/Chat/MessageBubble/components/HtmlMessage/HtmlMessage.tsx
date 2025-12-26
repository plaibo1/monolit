import { GridArchitectLoader } from "@/components/Chat/GridArchitectLoader";
import { HtmlMessageContent } from "./HtmlMessageContent";
import { ChatMessage } from "@/types/chat";
import { useGetChatInfo } from "@/api/chat";
import { useParams } from "next/navigation";

export const HtmlMessage = ({ message }: { message: ChatMessage }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { data } = useGetChatInfo(chatId);

  if (typeof message.messageBlockId === "undefined" || !data?.reports) {
    return null;
  }

  if (data?.reports[message.messageBlockId].active) {
    return <GridArchitectLoader />;
  }

  return (
    <HtmlMessageContent
      messageBlockId={message.messageBlockId}
      report={data.reports[message.messageBlockId]}
    />
  );
};
