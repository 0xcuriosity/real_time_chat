import express from "express";
import userRouter from "./routes/userRoute";
import roomRouter from "./routes/roomRoute";
import { userAuthMiddleware } from "./middlewares/userAuthMiddleware";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", userAuthMiddleware, roomRouter);
app.listen(3001, () => {
  console.log("object");
});
