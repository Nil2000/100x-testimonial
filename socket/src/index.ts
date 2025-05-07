import { createServer } from "https";
import { WebSocketServer } from "ws";
import { MESSAGE_TYPES, SOCKET_EVENTS } from "./constants";
import { MessageType } from "./types";
import { db } from "./db";
import {
  incrementCompletedActions,
  incrementPageViewCount,
  incrementTimeSpentOnWallOfLove,
  incrementVisitorCount,
} from "./actions";

const server = createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on(SOCKET_EVENTS.CONNECT_USER, (message: MessageType) => {
    console.log("Received message:", message);
  });

  ws.on(SOCKET_EVENTS.INCREMENT_VISITOR_COUNT, async (data) => {
    const { pageType, spaceId } = data;
    await incrementVisitorCount(pageType, spaceId);
  });

  ws.on(SOCKET_EVENTS.INCREMENT_PAGE_VIEW_COUNT, async (data) => {
    const { pageType, spaceId } = data;
    await incrementPageViewCount(pageType, spaceId);
  });

  ws.on(SOCKET_EVENTS.INCREMENT_TIME_SPENT, async (data) => {
    const { spaceId, timeSpent } = data;
    await incrementTimeSpentOnWallOfLove(spaceId, timeSpent);
  });

  ws.on(SOCKET_EVENTS.INCREMENT_COMPLETED_ACTIONS, async (data) => {
    const { spaceId } = data;
    await incrementCompletedActions(spaceId);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
