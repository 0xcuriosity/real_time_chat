import { Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { createUserSchema } from "@repo/common/zod";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/db/client";
interface AuthenticatedRequest extends Request {
  userId?: string;
}
const handleSignIn = async (req: Request, res: Response) => {
  try {
    // TODO - create a zod schema and use zod validation
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password required to singin",
      });
    }
    const foundUser = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });
    if (!foundUser) {
      return res.status(400).json({
        message: "user with the given username does not exist",
      });
    }
    // if control reaches here, username is valid - validate the password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      // 401 - unauthorised
      return res.status(401).json({
        message: "invalid password",
      });
    }
    // if control reaches here, username and password are valid
    // sign a jwt token and return it
    const token = jwt.sign(
      {
        id: foundUser.id,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      message: "signin successfull",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
const handleSignUp = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    // TODO - create a zod schema and use zod validation
    const { username, password, name, avatarUrl } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({
        message: "username, password and name are required to signup",
      });
    }
    // check if a user with the given username already exists
    const foundUser = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });
    if (foundUser) {
      // 409 - conflict
      return res.status(409).json({
        message: "user with the given username already exists",
      });
    }
    // hash the password
    const hashedPwd = await bcrypt.hash(password, 10);
    const createdUser = await prismaClient.user.create({
      data: {
        username,
        password: hashedPwd,
        name,
        avatarUrl,
      },
    });
    return res.status(200).json({
      message: "signup successfull",
      createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("server error");
  }
};

const handleGetUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log("getting user");
    const userId = req.userId;
    const foundUser = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      return res.status(404).json({
        message:
          "user with the given userId not found, ideally should not happen as this is a gated endpoint",
      });
    }
    return res.status(200).json(foundUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export { handleSignIn, handleSignUp, handleGetUser };
