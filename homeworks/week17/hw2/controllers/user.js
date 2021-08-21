const db = require("../models");
const Prize = db.Prize;
const User = db.User;

// hash
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  login: (req, res) => {
    res.render("login");
    return;
  },

  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    let user = null;
    try {
      if (!username || !password) {
        req.flash("errorMessage", "欄位請勿留白");
        return next();
      }
      user = await User.findOne({
        where: {
          username,
        },
      });
      bcrypt.compare(password, user.password, (error, isSuccess) => {
        if (error || !isSuccess) {
          req.flash("errorMessage", "密碼錯誤");
          return next();
        }
        req.session.username = username;
        req.session.userId = user.id;
        res.redirect("/");
        return;
      });
    } catch (error) {
      req.flash("errorMessage", "帳號錯誤");
      return next();
    }
    return;
  },

  logout: (req, res) => {
    req.session.userId = null;
    req.session.username = null;
    res.redirect("/");
    return;
  },
};

module.exports = userController;
