const request = require("request");
const URL =
  "https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery";

let [first, second, third, none, error] = [0, 0, 0, 0, 0];
let count = 10000;

const prizeProbability = (err, res, body) => {
  if (err) {
    error++;
    count--;
    request(URL, prizeProbability);
  }

  let data;
  if (res.statusCode >= 200 && res.statusCode < 400) {
    try {
      data = JSON.parse(body);
    } catch (err) {
      request(URL, prizeProbability);
      return;
    }
    const prize = data.prize;

    switch (prize) {
      case "FIRST":
        first++;
        break;
      case "SECOND":
        second++;
        break;
      case "THIRD":
        third++;
        break;
      case "NONE":
        none++;
        break;
      default:
        error++;
    }
    count--;
    console.log(
      `頭獎：${first}, 二獎：${second}, 三獎：${third}, 銘謝惠顧：${none}, 錯誤：${error}`
    );
    if (count) request(URL, prizeProbability);
  } else {
    error++;
    count--;
    request(URL, prizeProbability);
  }
};
request(URL, prizeProbability);

// 頭獎：4%, 二獎：20%, 三獎：31%, 銘謝惠顧：39%, 錯誤：6%
