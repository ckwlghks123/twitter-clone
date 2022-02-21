import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.get);

// GET /tweets/:id
router.get("/:id", tweetController.getById);

// POST /tweets
router.post("/", tweetController.create);

// PUT /tweets/:id
router.put("/:id", tweetController.update);

// DELETE /tweets/:id
router.delete("/:id", tweetController.remove);
export default router;
