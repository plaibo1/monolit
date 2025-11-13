const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");
const { fakeSocketMessages } = require("./fakeSocketMessages");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Массив сообщений
const messages = fakeSocketMessages;

// Отслеживание индекса для каждого клиента
const clientStates = new Map();

wss.on("connection", (ws) => {
  console.log("Новый клиент подключился");

  // Инициализация состояния клиента
  const clientId = Date.now() + Math.random();
  clientStates.set(ws, { index: 0, interval: null });

  // Отправка сообщений каждую секунду
  const interval = setInterval(() => {
    const state = clientStates.get(ws);

    if (state && state.index < messages.length) {
      ws.send(
        JSON.stringify(messages[state.index])
      );

      state.index++;
    } else {
      // Все сообщения отправлены
      clearInterval(interval);
      ws.send(
        JSON.stringify({
          message: "Все сообщения отправлены",
          completed: true,
        })
      );
    }
  }, 1000);

  clientStates.get(ws).interval = interval;

  ws.on("close", () => {
    console.log("Клиент отключился");
    const state = clientStates.get(ws);
    if (state && state.interval) {
      clearInterval(state.interval);
    }
    clientStates.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("Ошибка WebSocket:", error);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`WebSocket доступен на ws://localhost:${PORT}`);
});
