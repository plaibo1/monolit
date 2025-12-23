import { GridArchitectLoader } from "@/components/Chat/GridArchitectLoader";
import { HtmlMessageContent } from "./HtmlMessageContent";
import { ChatMessage } from "@/types/chat";

export const HtmlMessage = ({
  isLoading,
  message,
}: {
  message: ChatMessage;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <GridArchitectLoader />;
  }

  return <HtmlMessageContent message={message} />;
};
