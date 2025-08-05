import { Router } from "express";
import { handleCreateRoom } from "../controllers/roomController";
import { prismaClient } from "@repo/db/client";
const roomRouter: Router = Router();

roomRouter.post("/create", handleCreateRoom);
roomRouter.get("/chats/:roodId", async (req, res) => {
  const roomId = Number(req.params.roodId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });
  return res.status(200).json(messages);
});
roomRouter.get("/chats/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findUnique({
    where: {
      slug: slug,
    },
  });
  return res.status(200).json(room);
});
export default roomRouter;
