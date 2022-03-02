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
  const { text, username, name } = req.body;
  const tweet = await tweetData.create(text, username, name);

  res.status(201).json(tweet);
}

export async function update(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetData.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ text: `해당 ${id}의 트윗이 없습니다.` });
  }
}

export async function remove(req, res) {
  const id = req.params.id;
  await tweetData.remove(id);

  res.sendStatus(204);
}
