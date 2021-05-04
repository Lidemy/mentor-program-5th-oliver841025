const request = require("request");

const options = {
  method: "GET",
  url: "https://api.twitch.tv/kraken/games/top",
  headers: {
    Accept: "application/vnd.twitchtv.v5+json",
    "Client-ID": "cf2rjdklgkbltczqmcirnljp09ykz5",
  },
};

request(options, (err, res, body) => {
  if (err) return console.log("擷取失敗", err);
  let data = JSON.parse(body).top;
  for (let i of data) {
    console.log(i.viewers, i.game.name);
  }
  return;
});
