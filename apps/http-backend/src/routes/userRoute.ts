import { Router } from "express";
const userRouter: Router = Router();
import { handleSignIn, handleSignUp } from "../controllers/userController";
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);

export default userRouter;
