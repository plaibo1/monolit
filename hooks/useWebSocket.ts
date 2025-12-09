"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ConnectionStatus, SocketMessage } from "@/types/chat";

type UseWebSocketOptions = {
  url: string;
  onMessage: (data: SocketMessage) => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  onOpen?: () => void;
  onClose?: () => void;
  protocols?: string | string[];
  shouldReconnect?: boolean;

  devDisable?: boolean;
};

export const useWebSocket = (options: UseWebSocketOptions) => {
  const {
    url,
    onMessage,
    onError,
    onOpen,
    onClose,
    reconnectAttempts = 0,
    reconnectInterval = 3000,
    protocols,
    shouldReconnect = true,
    devDisable = false,
  } = options;

  const ws = useRef<WebSocket | null>(null);
  const reconnectCount = useRef(0);
  const reconnectTimeout = useRef<NodeJS.Timeout>(null);
  const isManuallyClosed = useRef(false);
  const messageQueue = useRef<unknown[]>([]);

  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);

  // Сохраняем коллбэки в рефы для стабильности
  const onMessageRef = useRef(onMessage);
  const onErrorRef = useRef(onError);
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onErrorRef.current = onError;
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  }, [onMessage, onError, onOpen, onClose]);

  const connect = useCallback(() => {
    if (isManuallyClosed.current) return;

    if (devDisable) {
      console.log("🤖 WebSocket was manually disabled");
      return;
    }

    try {
      setStatus("connecting");

      // Создаем новое подключение
      ws.current = new WebSocket(url, protocols);

      ws.current.onopen = () => {
        console.log("WebSocket connected");
        setStatus("connected");
        reconnectCount.current = 0;

        // Отправляем накопленные сообщения из очереди
        while (messageQueue.current.length > 0) {
          const msg = messageQueue.current.shift();
          ws.current?.send(msg as string);
        }

        onOpenRef.current?.();
      };

      ws.current.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
          onMessageRef.current(data);
        } catch (error) {
          console.error("Error parsing message:", error);
          onMessageRef.current(event.data);
        }
      };

      ws.current.onerror = (error: Event) => {
        console.error("WebSocket error:", error);
        setStatus("error");
        onErrorRef.current?.(error);
      };

      ws.current.onclose = (event: CloseEvent) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setStatus("disconnected");
        onCloseRef.current?.();

        if (event.code === 1006) {
          setStatus("error");
        }

        // Автоматическое переподключение
        if (
          shouldReconnect &&
          !isManuallyClosed.current &&
          reconnectCount.current < reconnectAttempts
        ) {
          reconnectCount.current++;
          console.log(
            `Reconnecting... (${reconnectCount.current}/${reconnectAttempts})`
          );

          reconnectTimeout.current = setTimeout(() => {
            // eslint-disable-next-line react-hooks/immutability
            connect();
          }, reconnectInterval);
        }
      };
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      setStatus("error");
    }
  }, [
    devDisable,
    url,
    protocols,
    shouldReconnect,
    reconnectAttempts,
    reconnectInterval,
  ]);

  // Отправка сообщений
  const sendMessage = useCallback((data: unknown) => {
    const message = typeof data === "string" ? data : JSON.stringify(data);

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.warn("WebSocket is not connected. Message queued.");
      messageQueue.current.push(message);
    }
  }, []);

  // Ручное закрытие соединения
  const disconnect = useCallback(() => {
    isManuallyClosed.current = true;

    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }

    if (ws.current) {
      ws.current.close(1000, "Manual disconnect");
      ws.current = null;
    }

    setStatus("disconnected");
  }, []);

  // Ручное переподключение
  const reconnect = useCallback(() => {
    disconnect();
    isManuallyClosed.current = false;
    reconnectCount.current = 0;
    connect();
  }, [connect, disconnect]);

  // Подключение при монтировании
  useEffect(() => {
    console.log("CONNECTED URL: ", url);
    connect();

    return () => {
      console.log("TRY TO DISCONNECT: ", url);
      isManuallyClosed.current = true;

      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log("DISCONNECTED: ", url);
        ws.current.close(1000, "Component unmounting");
      }
    };
  }, [connect]);

  return {
    status,
    lastMessage,
    sendMessage,
    disconnect,
    reconnect,
    isConnected: status === "connected",
  };
};
