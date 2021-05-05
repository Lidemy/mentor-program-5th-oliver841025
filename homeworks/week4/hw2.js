const request = require("request");
const process = require("process");
const URL = "https://lidemy-book-store.herokuapp.com";

const action = process.argv[2];
const bookId = process.argv[3]; // create 時，不需輸入 id，故變成輸入 bookName
const bookName = process.argv[4];

switch (action) {
  case "list":
    listBooks();
    break;
  case "read":
    readOneBook(bookId);
    break;
  case "delete":
    deleteOneBook(bookId);
    break;
  case "create":
    createOneBook(bookId); // 這邊其實是輸入 bookName
    break;
  case "update":
    updateOneBook(bookId, bookName);
    break;
  default:
    console.log("Available commands: list, read, delete, create, update 😉");
}

function listBooks() {
  request.get(`${URL}/books?_limit=20`, (err, res, body) => {
    if (res.statusCode >= 400 && res.statusCode < 600)
      return console.error("擷取失敗");
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      return console.error(err);
    }
    for (let i = 0; i < data.length; i++) {
      const { id, name } = data[i];
      console.log(`${id} ${name}`);
    }
  });
}

function readOneBook(id) {
  request.get(`${URL}/books/${id}`, (err, res, body) => {
    const data = JSON.parse(body);
    const { id, name } = data;
    if (res.statusCode >= 400 && res.statusCode < 600)
      return console.error("擷取失敗");
    return console.log(`${id} ${name}`);
  });
}

function deleteOneBook(id) {
  request.delete(`${URL}/books/${id}`, (err, res, body) => {
    const data = JSON.parse(body);
    const { id, name } = data;
    if (res.statusCode >= 400 && res.statusCode < 600)
      return console.error("刪除失敗");
    return console.log("刪除成功");
  });
}

function createOneBook(bookName) {
  request.post(
    {
      url: `${URL}/books`,
      form: { name: bookName },
    },
    (err, res, body) => {
      if (res.statusCode >= 400 && res.statusCode < 600)
        return console.error("新增失敗");
      return console.log("新增成功");
    }
  );
}

function updateOneBook(id, bookName) {
  request.patch(
    {
      url: `${URL}/books/${id}`,
      form: { name: bookName },
    },
    (err, res, body) => {
      if (res.statusCode >= 400 && res.statusCode < 600)
        return console.error("更新失敗");
      return console.log("更新成功");
    }
  );
}
