import express from "express";
import * as memberController from "../controller/member.js";

const router = express.Router();

router.post("/sign-up", memberController.signUp);

router.post("/login", memberController.logIn);

export default router;
