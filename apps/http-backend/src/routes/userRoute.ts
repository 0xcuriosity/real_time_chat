import { Router } from "express";
const userRouter: Router = Router();
import {
  handleSignIn,
  handleSignUp,
  handleGetUser,
} from "../controllers/userController";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware";
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.get("/get", userAuthMiddleware, handleGetUser);

export default userRouter;
