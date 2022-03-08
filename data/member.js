import bcrypt from "bcrypt";
import { config } from "../config.js";

const bcryptSalt = config.bcrypt.salt;

console.log(bcryptSalt);

const members = [
  {
    id: 1,
    username: "test",
    password: "$2b$10$IdlPzMPAsMB8iAzQfAHXXeBrLyCoXlWUUGgLIGgbI2aFllhi1t3u.",
    name: "지환",
    email: "ckwlghks12@naver.com",
    url: "dasd",
  },
];

export async function signUp({ username, password, name, email, url }) {
  const newMem = {
    id: Date.now().toString(),
    username,
    password: await bcrypt.hash(password, bcryptSalt),
    name,
    email,
    url,
  };
  members.push(newMem);
  return newMem.id;
}

export async function findUser(username) {
  return members.find((member) => member.username === username);
}

export async function findById(id) {
  return members.find((member) => member.id === id);
}

export async function confirmPW(password, loginUser) {
  return bcrypt.compare(password, loginUser.password);
}
