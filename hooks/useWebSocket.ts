"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type { ConnectionStatus, SocketMessage } from "@/types/chat"

type UseWebSocketOptions = {
  url: string
  onMessage: (data: SocketMessage) => void
  onError?: (error: Event) => void
  reconnectAttempts?: number
  reconnectInterval?: number
}

export function useWebSocket({
  url,
  onMessage,
  onError,
  reconnectAttempts = 5,
  reconnectInterval = 3000,
}: UseWebSocketOptions) {
  const [status, setStatus] = useState<ConnectionStatus>("connecting")
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCountRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        setStatus("connected")
        reconnectCountRef.current = 0
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as SocketMessage
          onMessage(data)
        } catch (error) {
          console.error("[v0] Failed to parse WebSocket message:", error)
        }
      }

      ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
        setStatus("error")
        onError?.(error)
      }

      ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        setStatus("disconnected")

        // Attempt to reconnect
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current += 1
          console.log(`[v0] Reconnecting... Attempt ${reconnectCountRef.current}/${reconnectAttempts}`)

          reconnectTimeoutRef.current = setTimeout(() => {
            setStatus("connecting")
            connect()
          }, reconnectInterval)
        } else {
          console.error("[v0] Max reconnection attempts reached")
          setStatus("error")
        }
      }
    } catch (error) {
      console.error("[v0] Failed to create WebSocket connection:", error)
      setStatus("error")
    }
  }, [url, onMessage, onError, reconnectAttempts, reconnectInterval])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message)
    } else {
      console.warn("[v0] WebSocket is not connected. Cannot send message.")
    }
  }, [])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    status,
    sendMessage,
    disconnect,
    reconnect: connect,
  }
}
