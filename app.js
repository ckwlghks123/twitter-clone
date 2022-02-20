import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from "./router/tweet.js";

const app = express();
const corsOptions = {
  origin: ["http://127.0.0.1:3000"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors(corsOptions));

app.use("/tweets", tweetRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Sorry");
});

app.listen(4000);
