import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/usersRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { registerSocketEvents } from "./sockets/socketHandler.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2],
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// route declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

export const server = http.createServer(app);

// web socket
export const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2],
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
  },
});

registerSocketEvents(io);
