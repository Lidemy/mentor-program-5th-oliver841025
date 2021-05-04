const request = require("request");
const URL = "https://lidemy-book-store.herokuapp.com";

request(`${URL}/books?_limit=10`, (err, res, body) => {
  if (err) return console.log("擷取失敗", err);
  let data;
  try {
    data = JSON.parse(body);
  } catch (err) {
    console.log(err);
    return;
  }
  for (let i = 0; i < 10; i++) {
    const { id } = data[i];
    const { name } = data[i];
    console.log(`${id} ${name}`);
  }
});
