const request = require("request");
const URL = "https://lidemy-book-store.herokuapp.com";

request(`${URL}/books?_limit=10`, (err, res, body) => {
  // 發生錯誤提早結束
  if (err) return console.error(err);

  let data;
  // 正常情況
  if (res.statusCode >= 200 && res.statusCode < 300) {
    try {
      data = JSON.parse(body);
      for (let i of data) {
        console.log(`${i.id} ${i.name}`);
      }
    } catch (err) {
      console.error(err);
      return;
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
