import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });
interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
const users: User[] = [];
function checkUser(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return null;
    }
    if (!decoded || !decoded.id) {
      return null;
    }
    return decoded.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}
wss.on("connection", function connection(ws, request) {
  console.log("connection");
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  console.log(token);
  if (!token) return;
  const userId = checkUser(token);
  if (userId === null) {
    console.log("closing");
    ws.close();
    return;
  }
  users.push({
    ws,
    userId,
    rooms: [],
  });

  ws.on("message", async function mes(data) {
    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type === "join_room") {
      console.log("joining room");
      const user = users.find((x) => x.ws === ws); // get all the users that are connected to this websocket stream
      user?.rooms.push(parsedData.roomId);
      console.log(`user : ${user?.userId} joined room ${parsedData.roomId}`);
    }
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((x) => x !== parsedData.room);
    }
    if (parsedData.type === "chat") {
      console.log("chat");
      const sender = users.find((x) => x.ws === ws);
      const roomId = parsedData.roomId;
      const message = parsedData.message as unknown as string;
      await prismaClient.chat.create({
        data: {
          roomId: roomId as unknown as number,
          message,
          senderId: userId as unknown as string,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
              senderId: sender?.userId,
            })
          );
        }
      });
    }
  });
});

// join room using
