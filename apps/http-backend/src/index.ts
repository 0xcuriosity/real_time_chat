import express from "express";
import userRouter from "./routes/userRoute";
import roomRouter from "./routes/roomRoute";
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/room", roomRouter);
app.listen(3001, () => {
  console.log("object");
});
