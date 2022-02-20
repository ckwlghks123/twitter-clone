import express from "express";

const router = express.Router();

const tweets = [
  {
    id: 1,
    message: "첫 트윗",
    createdAt: Date.now().toString(),
    name: "사용자 이름",
    username: "아이디",
    url: "사용자 이미지 url",
  },
];

router.get("/", (req, res, next) => {
  const { username } = req.query;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;

  res.status(200).json(data);
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const data = tweets.find((tweet) => tweet.id === id);

  data
    ? res.status(200).json(data)
    : res.status(404).json({ message: `id ${id}의 트윗이 없음` });
});

router.post("/", (req, res, next) => {
  const { message, username, name } = req.body;
  const tweet = {
    id: Date.now().toString(),
    message,
    createdAt: new Date(),
    name,
    username,
  };
  tweets.unshift(tweet);
  res.status(201).json(tweet);
});

router.put("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const message = req.body.message;
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.message = message;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `해당 ${id}의 트윗이 없습니다.` });
  }
});

router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);

  tweets = tweets.filter((tweet) => tweet.id !== id);

  res.sendStatus(204);
});
export default router;
