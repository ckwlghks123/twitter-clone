import bcrypt from "bcrypt";
import { config } from "../config.js";
import { db } from "../db/database.js";

const bcryptSalt = config.bcrypt.salt;

export async function signUp({ username, password, name, email, url }) {
  const optionUrl = url || null;
  const encPW = await bcrypt.hash(password, bcryptSalt);
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
      [username, encPW, name, email, optionUrl]
    )
    .then((result) => result[0].insertId);
}

export async function findUser(username) {
  return db
    .execute(
      "SELECT id, username, password, name, email, url FROM users WHERE username=?",
      [username]
    )
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute(
      "SELECT id, username, password, name, email, url FROM users WHERE id=?",
      [id]
    )
    .then((result) => result[0][0]);
}

export async function confirmPW(password, loginUser) {
  return bcrypt.compare(password, loginUser.password);
}
