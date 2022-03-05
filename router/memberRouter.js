import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import * as memberController from "../controller/member.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/sign-up", memberController.signUp);

router.post("/login", memberController.logIn);

router.get("/me", isAuth, memberController.me);

export default router;
