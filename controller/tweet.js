import * as tweetData from "../data/tweet.js";

export function get(req, res) {
  const { username } = req.query;
  const data = username ? tweetData.getByUser(username) : tweetData.get();

  res.status(200).json(data);
}

export function getById(req, res) {
  const id = Number(req.params.id);
  const data = tweetData.getById(id);

  data
    ? res.status(200).json(data)
    : res.status(404).json({ text: `id ${id}의 트윗이 없음` });
}

export function create(req, res) {
  const { text, username, name } = req.body;
  const tweet = tweetData.create(text, username, name);

  res.status(201).json(tweet);
}

export function update(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetData.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ text: `해당 ${id}의 트윗이 없습니다.` });
  }
}

export function remove(req, res) {
  const id = req.params.id;
  tweetData.remove(id);

  res.sendStatus(204);
}
