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
  // 發生錯誤提早結束
  if (err) return console.error(err);

  let data = JSON.parse(body).top;

  if (res.statusCode >= 200 && res.statusCode < 300) {
    // 正常情況
    try {
      for (let i of data) {
        console.log(i.viewers, i.game.name);
      }
    } catch (err) {
      console.error(err);
    }
    // 4xx, 5xx 錯誤情況
  } else {
    try {
      const msg = JSON.parse(body);
      console.error(msg);
    } catch (err) {
      console.error(err);
    }
  }
});
