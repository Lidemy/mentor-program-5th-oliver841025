const request = require("request");
const process = require("process");
const URL = "https://lidemy-book-store.herokuapp.com";

const userInput1 = process.argv[2];
const userInput2 = process.argv[3]; //id || bookName
const userInput3 = process.argv[4]; // id || bookName

switch (userInput1) {
  case "list":
    listBooks();
    break;
  case "read":
    readOneBook(userInput2);
    break;
  case "delete":
    deleteOneBook(userInput2);
    break;
  case "create":
    createOneBook(userInput2);
    break;
  case "update":
    updateOneBook(userInput2, userInput3);
    break;
  default:
    console.log("Available commands: list, read, delete, create, update 😉");
}

function listBooks() {
  request.get(`${URL}/books?_limit=20`, (err, res, body) => {
    if (err) return console.log("擷取失敗", err);
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      return console.log(err);
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
    if (err) return console.log("擷取失敗");
    return console.log(`${id} ${name}`);
  });
}

function deleteOneBook(id) {
  request.delete(`${URL}/books/${id}`, (err, res, body) => {
    const data = JSON.parse(body);
    const { id, name } = data;
    if (err) return console.log("刪除失敗");
    return console.log("刪除成功");
  });
}

function createOneBook(bookName) {
  request.post(
    {
      url: `${URL}/books`,
      form: { id: "", name: bookName },
    },
    (err, res, body) => {
      if (err) return console.log("新增失敗");
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
      if (err) return console.log("更新失敗");
      return console.log("更新成功");
    }
  );
}
