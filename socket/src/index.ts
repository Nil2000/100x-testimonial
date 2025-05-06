import { createServer } from "https";
import { WebSocketServer } from "ws";

const server = createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
