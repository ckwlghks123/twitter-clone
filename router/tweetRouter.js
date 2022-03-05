import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", isAuth, tweetController.get);

// GET /tweets/:id
router.get("/:id", isAuth, tweetController.getById);

// POST /tweets
router.post("/", isAuth, validate, tweetController.create);

// PUT /tweets/:id
router.put("/:id", isAuth, tweetController.update);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetController.remove);
export default router;
