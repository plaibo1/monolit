const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");
const cors = require("cors");

const app = express();
// allow all cors
app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const { fakeSocketMessages } = require("./fakeSocketMessages");
// Массив сообщений
const mockMessages = fakeSocketMessages;

// In-memory база данных чатов
const chats = new Map();

// Инициализация мокового чата chat1
chats.set("chat1", {
  id: "chat1",
  createDate: new Date().toISOString(),
  name: "Моковый чат (с интервалом)",
  messages: [],
});

// Хранение подключений по chatId
// chatId -> Set<WebSocket>
const chatConnections = new Map();

wss.on("connection", (ws, req) => {
  console.log("Новый клиент подключился");

  // Извлекаем chatId из URL (например: ws://localhost:3000?chatId=chat1)
  const url = new URL(req.url, `http://${req.headers.host}`);
  const chatId = url.searchParams.get("chatId");

  if (!chatId) {
    ws.close(1008, "chatId не указан");
    return;
  }

  // Добавляем WebSocket в набор подключений для этого чата
  if (!chatConnections.has(chatId)) {
    chatConnections.set(chatId, new Set());
  }
  chatConnections.get(chatId).add(ws);

  ws.chatId = chatId;

  console.log(`Клиент подключился к чату: ${chatId}`);
  console.log(
    `Активных подключений к чату ${chatId}: ${chatConnections.get(chatId).size}`
  );

  // Если это chat1, запускаем интервальную отправку сообщений
  if (chatId === "chat1") {
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockMessages.length) {
        ws.send(JSON.stringify(mockMessages[index]));
        index++;
      } else {
        clearInterval(interval);
        ws.send(
          JSON.stringify({
            message: {
              text: "Все сообщения отправлены",
            },
            completed: true,
          })
        );
      }
    }, 1000);

    ws.interval = interval;
  }

  ws.on("close", () => {
    console.log(`Клиент отключился от чата: ${ws.chatId}`);

    // Очищаем интервал для chat1
    if (ws.interval) {
      clearInterval(ws.interval);
    }

    // Удаляем WebSocket из набора подключений
    if (ws.chatId && chatConnections.has(ws.chatId)) {
      chatConnections.get(ws.chatId).delete(ws);
      console.log(
        `Активных подключений к чату ${ws.chatId}: ${
          chatConnections.get(ws.chatId).size
        }`
      );

      // Если больше нет подключений к этому чату, удаляем запись
      if (chatConnections.get(ws.chatId).size === 0) {
        chatConnections.delete(ws.chatId);
        console.log(`Чат ${ws.chatId} больше не имеет активных подключений`);
      }
    }
  });

  ws.on("error", (error) => {
    console.error("Ошибка WebSocket:", error);
  });
});

// POST /send-message - отправка сообщения в чат
app.post("/send-message", (req, res) => {
  console.log("Получен запрос /send-message:", req.body);

  const { type, message } = req.body;

  if (!type || !message || !message.text) {
    return res
      .status(400)
      .json({ error: "Неверный формат: требуются type и message.text" });
  }

  const chatId = req.body.chatId ?? `chat_id_${Date.now().toString()}`;

  // Проверяем, существует ли чат, если нет - создаём
  if (!chats.has(chatId)) {
    chats.set(chatId, {
      id: chatId,
      createDate: new Date().toISOString(),
      name: `Чат ${chatId}`,
      messages: [],
    });
    console.log(`Создан новый чат: ${chatId}`);
  }

  // Сохраняем сообщение в историю чата
  const chat = chats.get(chatId);
  const messageData = {
    id: Date.now().toString(),
    type,
    message,
    timestamp: new Date().toISOString(),
  };
  chat.messages.push(messageData);

  // Формируем сообщение для отправки через WebSocket
  const responseMessage = {
    type,
    message: {
      text: message.text,
    },
  };

  // Отправляем сообщение всем WebSocket подключениям этого чата
  if (chatConnections.has(chatId)) {
    const connections = chatConnections.get(chatId);
    console.log(
      `Отправка сообщения ${connections.size} подключениям чата ${chatId}`
    );

    connections.forEach((client) => {
      if (client.readyState === 1) {
        // 1 = OPEN
        client.send(JSON.stringify(responseMessage));
      }
    });
  } else {
    console.log(`Нет активных подключений к чату ${chatId}`);
  }

  res.json({
    success: true,
    message: "Сообщение отправлено",
    chatId,
    savedMessage: messageData,
    activeConnections: chatConnections.has(chatId)
      ? chatConnections.get(chatId).size
      : 0,
  });
});

// GET /chats - получить все чаты
app.get("/chats", (req, res) => {
  const chatList = Array.from(chats.values()).map((chat) => ({
    id: chat.id,
    createDate: chat.createDate,
    name: chat.name,
    messageCount: chat.messages.length,
    activeConnections: chatConnections.has(chat.id)
      ? chatConnections.get(chat.id).size
      : 0,
  }));

  res.json(chatList);
});

// GET /chats/:id - получить чат по id
app.get("/chats/:id", (req, res) => {
  const { id } = req.params;
  const chat = chats.get(id);

  if (!chat) {
    return res.status(404).json({ error: "Чат не найден" });
  }

  res.json({
    ...chat,
    activeConnections: chatConnections.has(id)
      ? chatConnections.get(id).size
      : 0,
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`WebSocket доступен на ws://localhost:${PORT}`);
});
