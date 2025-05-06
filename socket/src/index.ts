import { createServer } from "https";
import { WebSocketServer } from "ws";
import { MESSAGE_TYPES, SOCKET_EVENTS } from "./constants";
import { MessageType } from "./types";
import { db } from "./db";

const server = createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on(SOCKET_EVENTS.CONNECT_USER, (message: MessageType) => {
    console.log("Received message:", message);
  });
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
