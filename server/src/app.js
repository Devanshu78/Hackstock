import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/usersRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { registerSocketEvents } from "./sockets/socketHandler.js";

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN_1,
  process.env.CORS_ORIGIN_2,
].filter(Boolean); // Remove undefined values

// Robust origin checker function
const checkOrigin = (origin, callback) => {
  // Allow requests with no origin (like mobile apps, curl, or server-to-server)
  if (!origin) return callback(null, true);

  if (allowedOrigins.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    console.log(`❌ BLOCKING ORIGIN: ${origin}`); // Log this to see what's failing!
    console.log(`✅ ALLOWED LIST: ${allowedOrigins}`);
    callback(new Error("Not allowed by CORS"));
  }
};

app.use(
  cors({
    origin: checkOrigin,
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS",
    credentials: true,
    optionsSuccessStatus: 200,
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

export const io = new Server(server, {
  cors: {
    origin: checkOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

registerSocketEvents(io);
