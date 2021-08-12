const db = require("../models");
const User = db.User;

// hash 設定
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  register: (req, res) => {
    // render register 頁面
    res.render("register");
    return;
  },

  handleRegister: async (req, res, next) => {
    // 處理 register 的事
    // 拿到輸入的 username, password
    const { username, password } = req.body;
    let user = null;
    // 確認 username, password 都不為空
    if (!username || !password) {
      req.flash("errorMessage", "任一欄位請勿留白");
      return next();
    }
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      // 確認寫入過程是否有誤
      if (error) {
        req.flash("errorMessage", "程序發生錯誤，請重新整理後再試一次");
        return next();
      }
      try {
        // hash 密碼進去
        // 寫入成功會得到結果，就是寫入的使用者
        user = await User.create({
          username,
          password: hash,
        });
      } catch (error) {
        req.flash("errorMessage", "此帳號已被註冊");
        return next();
      }
      req.session.username = username;
      req.session.userId = user.id;
      res.redirect("/");
      return;
    });
    return;
  },

  logout: (req, res) => {
    // session 清空
    req.session.userId = null;
    req.session.username = null;
    // 導回去
    res.redirect("/");
    return;
  },

  login: (req, res) => {
    // render login 頁面
    res.render("login");
    return;
  },

  handleLogin: async (req, res, next) => {
    // 拿到輸入值 帳號 密碼
    const { username, password } = req.body;
    let user = null;
    // 確認輸入不為空
    if (!username || !password) {
      req.flash("errorMessage", "任一欄位請勿留白");
      return next();
    }
    try {
      user = await User.findOne({
        where: {
          username,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "帳號錯誤");
      return next();
    }
    // hash 比對
    bcrypt.compare(password, user.password, function (error, isSuccess) {
      if (error || !isSuccess) {
        req.flash("errorMessage", "密碼錯誤");
        return next();
      }
      // 成功的話就設定 session
      req.session.username = username;
      req.session.userId = user.id;
      res.redirect("/");
      return;
    });
    return;
  },
};

// 輸出 userController
module.exports = userController;
