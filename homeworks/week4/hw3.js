const request = require("request");
const process = require("process");
const URL = "https://restcountries.eu/rest/v2";

const userInput = process.argv[2];
// 發生錯誤提早結束
if (!userInput) {
  return console.log("請輸入國家名稱");
}

request.get(`${URL}/name/${userInput}`, (err, res, body) => {
  const data = JSON.parse(body);
  // 正常情況
  if (res.statusCode >= 200 && res.statusCode < 300) {
    try {
      for (let i of data) {
        console.log(`============
國家：${i.name}
首都：${i.capital}
貨幣：${i.currencies[0].code}
國碼：${i.callingCodes[0]}`);
      }
    } catch (err) {
      console.error(err);
      return;
    }
    // 4xx, 5xx 錯誤情況
  } else {
    console.log(res.statusCode);
    console.log("擷取錯誤 ...");
  }
});
