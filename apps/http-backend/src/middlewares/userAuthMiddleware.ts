import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
interface AuthenticatedRequest extends Request {
  userId?: String;
}
export const userAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;
    if (!token || typeof token !== "string") {
      throw new Error("you are not signed in");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && "id" in decoded) {
      req.userId = decoded.id;
      next();
    } else {
      throw new Error("invalid token payload");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
