const tweets = [
  {
    id: 1,
    text: "첫 트윗",
    createdAt: Date.now().toString(),
    name: "사용자 이름",
    username: "아이디",
    url: "사용자 이미지 url",
  },
];

export function get() {
  return tweets;
}

export function getByUser(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, username, name) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets.unshift(tweet);
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  tweet && (tweet.text = text);
  return tweet;
}

export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
