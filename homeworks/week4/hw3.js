const request = require("request");
const process = require("process");
const URL = "https://restcountries.eu/rest/v2";

const userInput = process.argv[2];

if (!userInput) {
  return console.log("請輸入國家名稱");
}

request.get(`${URL}/name/${userInput}`, (err, res, body) => {
  const data = JSON.parse(body);

  if (data.statusCode >= 400 && data.statusCode < 500) {
    return console.log("找不到國家資訊");
  }

  const { name, capital, currencies, callingCodes } = data[0];

  if (!err) {
    console.log(
      `
            國家：${name}
            首都：${capital}
            貨幣：${currencies[0].code}
            國碼：${callingCodes[0]}
            `
    );
  } else {
    return console.log("擷取失敗", err);
  }
});
