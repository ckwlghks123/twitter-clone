import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userData from "../data/member.js";

const ERROR_MESSAGE = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(ERROR_MESSAGE);
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(ERROR_MESSAGE);
    }
    const user = await userData.findById(decoded.id);

    if (!user) {
      return res.status(401).json(ERROR_MESSAGE);
    }
    req.userId = user.id;
    req.token = user.token;
    next();
  });
};
