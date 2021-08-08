// 引入 controller 檔案
const articleController = require("./controllers/article");
const userController = require("./controllers/user");
const categoryController = require("./controllers/category");

// 引入 port, 設定 express
const express = require("express");
const app = express();
const port = 3001;

//引入 session 狀態儲存, 解析 body, 錯誤顯示
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

// 設定樣版引擎
app.set("view engine", "ejs");

// session 設定
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// body-parser 設定
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
// 靜態資源資料夾 public 讀入設定
app.use(express.static("public"));

// 全域狀態設定
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.id = req.session.userId;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

// 做完動作回到上一頁
function redirectBack(req, res) {
  res.redirect("back");
  return;
}

// 管理員身份確認
function isAdmin(req, res, next) {
  if (req.session.userId !== 1) {
    return res.redirect("/");
  }
  next();
}

// 路由
// 首頁
app.get("/", articleController.getAllArticles);

// ----------- 使用者 -----------
// 註冊
app.get("/register", userController.register);
app.post("/register", userController.handleRegister, redirectBack);
// 登入
app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
//登出
app.get("/logout", userController.logout);

// ----------- 文章 -----------
// 新增文章
app.get("/add-article", isAdmin, articleController.addArticle);
app.post(
  "/add-article",
  isAdmin,
  articleController.handleAddArticle,
  redirectBack
);
// 文章刪除
app.get(
  "/delete-article/:id",
  isAdmin,
  articleController.deleteArticle,
  redirectBack
);
// 文章編輯
app.get(
  "/update-article/:id",
  isAdmin,
  articleController.updateArticle,
  redirectBack
);
app.post(
  "/update-article/:id",
  isAdmin,
  articleController.handleUpdateArticle,
  redirectBack
);
// 顯示完整單篇文章
app.get(
  "/show-single-article/:id",
  articleController.getSingleArticle,
  redirectBack
);
// 秀出文章列表
app.get("/show-articles-list", articleController.showArticlesList);

// --------- 分類 -----------
// 分類頁面
app.get("/show-categories", categoryController.getAllCategories);
// 新增分類
app.get("/add-category", isAdmin, categoryController.addCategory);
app.post(
  "/add-category",
  isAdmin,
  categoryController.handleAddCategory,
  redirectBack
);
// 編輯分類
app.get(
  "/update-category/:id",
  isAdmin,
  categoryController.updateCategory,
  redirectBack
);
app.post(
  "/update-category/:id",
  isAdmin,
  categoryController.handleUpdateCategory
);
// 刪除分類
app.get(
  "/delete-category/:id",
  isAdmin,
  categoryController.deleteCategory,
  redirectBack
);

// ----------- 後台管理 -----------
app.get(
  "/back-stage",
  isAdmin,
  articleController.backShowArticles,
  redirectBack
);

// 啟動提示
app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
