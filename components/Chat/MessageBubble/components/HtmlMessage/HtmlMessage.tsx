import { GridArchitectLoader } from "@/components/Chat/GridArchitectLoader";
import { HtmlMessageContent } from "./HtmlMessageContent";
import { ChatMessage } from "@/types/chat";

export const HtmlMessage = ({
  isLoading,
  onHtmlClick,
  message,
}: {
  message: ChatMessage;
  isLoading: boolean;
  onHtmlClick?: ({
    html,
    messageId,
  }: {
    html: string;
    messageId: string;
  }) => void;
}) => {
  if (isLoading) {
    return <GridArchitectLoader />;
  }

  return <HtmlMessageContent message={message} onHtmlClick={onHtmlClick} />;
};
