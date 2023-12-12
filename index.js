import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import videoRouter from "./routes/videos.js";
import commentRouter from "./routes/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from 'connect-mongo'
import passport from 'passport'
import User from "./models/User.js";
import LocalStrategy from 'passport-local'
import notifyRouter from './routes/notifications.js'

const app = express();

app.use(cookieParser());

dotenv.config();

app.use(cors({
  origin: "https://viddtube.netlify.app",
  credentials: true
}));

app.use(express.urlencoded({
  extended: true
}));

const connect = () => {
  mongoose.connect(process.env.MONGO)
    .then(() => console.log("connected to DB"))
    .catch((e) => console.log("connection error", e));
};

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", videoRouter);
app.use("/api", commentRouter);
app.use("/api", notifyRouter)

app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    message,
    status,
  });
});

app.listen("8080", () => {
  connect();
  console.log("server has started on port 8080");
});
