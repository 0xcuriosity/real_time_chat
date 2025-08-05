import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
interface AuthenticatedRequest extends Request {
  userId?: String;
}
const handleCreateRoom = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug } = req.body;
    if (!slug) {
      return res.status(400).json({
        message: "enter a unique room name",
      });
    }
    const adminId = req.userId as string;
    if (!adminId) {
      // 401 - unauthorized
      return res.status(401).json({
        message:
          "you are not signed in, ideally should not happen as this endpoint is gated by userAuthMiddleware",
      });
    }
    const foundRoom = await prismaClient.room.findUnique({
      where: {
        slug,
      },
    });
    if (foundRoom) {
      return res.status(409).json({
        message: "enter a unique room name",
      });
    }
    // if control reaches here, the user is authenticated and the slug is unique
    const createdRoom = await prismaClient.room.create({
      data: {
        adminId,
        slug,
      },
    });
    return res.status(200).json({
      message: "created room successfully",
      createdRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export { handleCreateRoom };
