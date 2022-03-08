import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { config } from "../config";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("인증 오류"));
      }
      jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
        if (err) {
          return next(new Error("인증 오류"));
        }
        next();
      });
    });

    this.io.on("connection", (socket) => {
      console.log("Socket client connected");
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error("소켓을 먼저 생성해주세요");
  }
  return socket.io;
}
