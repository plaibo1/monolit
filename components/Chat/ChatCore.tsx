import { useWebSocket } from "@/hooks/useWebSocket";
import { getWebSocketUrl } from "@/lib/api";
import { ChatMessageHandler } from "@/lib/message-handler";
import { useChatStore } from "@/store/useChatStore";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { ChatState } from "@/store/useChatStore";

const shallow = (state: ChatState) => ({
  addMessage: state.addMessage,
  updateMessage: state.updateMessage,
  addActionToMessage: state.addActionToMessage,
  addStepToMessage: state.addStepToMessage,
  updateStepInMessage: state.updateStepInMessage,
  clearMessages: state.clearMessages,
  onTaskStart: state.onTaskStart,
  onTaskEnd: state.onTaskEnd,
});

export const ChatCore = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const websocketUrl = getWebSocketUrl(chatId);

  const {
    addMessage,
    updateMessage,
    addActionToMessage,
    addStepToMessage,
    updateStepInMessage,
    clearMessages,
    onTaskStart,
    onTaskEnd,
  } = useChatStore(useShallow(shallow));

  const handleWebSocketMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      const handler = new ChatMessageHandler({
        onUserMessage: addMessage,
        onAssistantMessage: (message) => {
          addMessage(message, true);
        },
        onUpdateAssistantMessage: updateMessage,
        onStep: addStepToMessage,
        onUpdateStep: updateStepInMessage,
        onAction: addActionToMessage,
        onTaskStart,
        onTaskEnd,
        onFirstInteraction: (data) => {
          // setThreadId(data.thread_id);
        },
        onClearAsk: () => {
          // Handle clear ask if needed
        },
        onClearCallFn: () => {
          // Handle clear call function if needed
        },
        onUnknownMessage: addMessage,
      });

      handler.handleMessage(data);
    },
    [
      addMessage,
      updateMessage,
      addActionToMessage,
      addStepToMessage,
      updateStepInMessage,
    ]
  );

  const { status, reconnect } = useWebSocket({
    url: websocketUrl,
    onMessage: handleWebSocketMessage,
  });

  useEffect(() => {
    if (status === "error") {
      // TODO: add error style
      toast(
        "Failed to connect to the chat server. Please check your connection and try again.",
        {
          cancel: true,
          dismissible: true,
          position: "top-center",
          action: (
            <>
              <Button variant="outline" onClick={reconnect}>
                Retry
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
              </Button>
            </>
          ),
          icon: <AlertCircle className="h-4 w-4" />,
        }
      );
    }

    const handler = () => {
      if (status === "disconnected") {
        reconnect();
        clearMessages();
      }
    };

    window.addEventListener("focus", handler);

    return () => {
      window.removeEventListener("focus", handler);
    };
  }, [status, reconnect]);

  useEffect(() => {
    return () => {
      clearMessages();
    };
  }, []);

  return null;
};
