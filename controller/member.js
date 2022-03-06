import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as memberData from "../data/member.js";

const jwtEXP = config.jwt.expiresSec;
const jwtkey = config.jwt.secretKey;

export async function signUp(req, res) {
  const { username } = req.body;
  const existed = await memberData.findUser(username);
  if (existed) {
    return res.status(409).json({ message: `${username}가 이미 존재합니다` });
  }
  const userId = await memberData.signUp(req.body);
  const token = genToken(userId);
  res.status(201).json({ token, username });
}

export async function logIn(req, res) {
  const { username, password } = req.body;
  const userExists = await memberData.findUser(username);

  if (!userExists) {
    return res.status(401).json({ message: "invalid user or password" });
  }
  const passwordConfirmed = await memberData.confirmPW(password, userExists);
  if (!passwordConfirmed) {
    return res.status(401).json({ message: "invalid user or password" });
  }

  const token = genToken(userExists.id);
  res.status(200).json({ token, username });
}

export async function me(req, res) {
  const user = await memberData.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

function genToken(id) {
  return jwt.sign({ id }, jwtkey, { expiresIn: jwtEXP });
}
