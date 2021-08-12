const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const prizeController = require("./controllers/prize");
const userController = require("./controllers/user");
const { handleRegister } = require("./controllers/user");

app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());

app.use((req, res, next) => {
  res.locals.id = req.session.userId;
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.use(express.static("public"));

function isAdmin(req, res, next) {
  if (req.session.userId !== 1) {
    res.redirect("/");
    return;
  }
  next();
  return;
}

function redirectBack(req, res) {
  res.redirect("back");
  return;
}

function isLogin(req, res, next) {
  if (req.session.userId) {
    res.redirect("back");
    return;
  }
  return next();
}

// 首頁
app.get("/", prizeController.index);

// 使用者相關操作
// 登入
app.get("/login", isLogin, userController.login);
app.post("/login", isLogin, userController.handleLogin, redirectBack);
// 登出
app.get("/logout", userController.logout);
// 後台頁面
app.get("/back-stage", isAdmin, prizeController.backStage);

// 獎品相關操作
// 新增獎品資訊
app.get("/add-inform", isAdmin, prizeController.add);
app.post("/add-inform", isAdmin, prizeController.handleAdd, redirectBack);
// 調整獎品資訊
app.get("/update-inform/:id", isAdmin, prizeController.update);
app.post(
  "/update-inform/:id",
  isAdmin,
  prizeController.handleUpdate,
  redirectBack
);
// 刪除獎品資訊
app.get("/delete-inform/:id", isAdmin, prizeController.delete);
// 抽一個獎出來
app.get("/draw-prize", prizeController.drawPrize, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
