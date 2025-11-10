import { ChatInterface } from "@/components/ChatInterface"

export default function Home() {
  // Replace with your actual WebSocket URL
  const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://5.39.222.41:8080/api/v1/ws/chat/39e56155-ac3b-4e2a-aa60-bb85d519d163"

  return <ChatInterface websocketUrl={websocketUrl} />
}
