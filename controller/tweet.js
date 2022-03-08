import { getSocketIO } from "../connection/socket.js";
import * as tweetData from "../data/tweet.js";

export async function get(req, res) {
  const { username } = req.query;
  const data = await (username
    ? tweetData.getByUser(username)
    : tweetData.get());

  res.status(200).json(data);
}

export async function getById(req, res) {
  const id = Number(req.params.id);
  const data = await tweetData.getById(id);

  data
    ? res.status(200).json(data)
    : res.status(404).json({ text: `id ${id}의 트윗이 없음` });
}

export async function create(req, res) {
  const { text } = req.body;
  const tweet = await tweetData.create(text, req.userId);

  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
}

export async function update(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetData.getById(id);

  if (!tweet) {
    res.status(404).json({ text: `해당 ${id}의 트윗이 없습니다.` });
  }
  if (tweet.userId !== req.userId) {
    res.status(403).json({ text: `Unauthorized user` });
  }

  const updatedTweet = tweetData.update(id, text);

  res.status(200).json(updatedTweet);
}

export async function remove(req, res) {
  const id = req.params.id;
  const tweet = tweetData.getById(id);

  if (!tweet) {
    res.status(404).json({ text: `해당 ${id}의 트윗이 없습니다.` });
  }
  if (tweet.userId !== req.userId) {
    res.status(403).json({ text: `Unauthorized user` });
  }

  await tweetData.remove(id);
  res.sendStatus(204);
}
