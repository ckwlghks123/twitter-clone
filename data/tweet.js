import * as memberData from "./member.js";

let tweets = [
  {
    id: 1,
    text: "첫 트윗",
    createdAt: Date.now().toString(),
    userId: 1,
  },
];

export async function get() {
  return Promise.all(
    tweets.map(async (tweet) => {
      console.log(tweet);
      const { username, name, url } = await memberData.findById(tweet.userId);

      return { ...tweet, username, name, url };
    })
  );
}

export async function getByUser(username) {
  return get().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await memberData.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets.unshift(tweet);
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  tweet && (tweet.text = text);
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
