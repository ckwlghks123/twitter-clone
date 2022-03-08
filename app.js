import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from "./router/tweetRouter.js";
import memberRouter from "./router/memberRouter.js";
import { config } from "./config.js";
import { Server } from "socket.io";
import { initSocket } from "./connection/socket.js";

const app = express();
const corsOptions = {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsOptions));

app.use("/tweets", tweetRouter);
app.use("/user", memberRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  res.status(500).send("Sorry");
});

const server = app.listen(config.host.port);
initSocket(server);
