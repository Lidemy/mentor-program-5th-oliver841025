const db = require("../models");
const Prize = db.Prize;

const prizeController = {
  index: (req, res) => {
    res.render("index");
    return;
  },

  drawPrize: async (req, res, next) => {
    let prizeArr = null;
    const randomNum = Math.floor(Math.random() * 100) + 1;

    function sumRate(num) {
      let result = 0;
      for (let i = 0; i <= num; i++) {
        result += prizeArr[i].probability;
      }
      return result;
    }
    try {
      prizeArr = await Prize.findAll({
        where: {
          is_deleted: 0,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "發生錯誤");
      return next();
    }
    if (randomNum > sumRate(prizeArr.length - 1)) {
      const fault = {
        name: "再來一次",
        description: "oh...好像沒有小怪獸願意跟隨你...",
      };
      return res.render("result", {
        prize: fault,
      });
    }

    for (let index in prizeArr) {
      if (randomNum <= sumRate(index)) {
        return res.render("result", {
          prize: prizeArr[index],
        });
      }
    }
    return;
  },

  backStage: async (req, res) => {
    let prizes;
    try {
      prizes = await Prize.findAll({
        where: {
          is_deleted: 0,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "發生錯誤");
      return next();
    }
    res.render("backStage", { prizes });
    return;
  },

  delete: async (req, res, next) => {
    const { id } = req.params;
    let prize = null;
    try {
      prize = await Prize.findOne({
        where: {
          id,
          is_deleted: 0,
        },
      });
      await prize.update({
        is_deleted: 1,
      });
    } catch (error) {
      req.flash("errorMessage", "刪除失敗");
      return next();
    }
    res.redirect("/back-stage");
    return;
  },

  add: (req, res) => {
    res.render("add");
    return;
  },

  handleAdd: async (req, res, next) => {
    const { name, desc, imgUrl, probability } = req.body;
    let prize = null;
    // 寫入資料庫
    try {
      if (!name || !desc || !imgUrl || !probability) {
        req.flash("errorMessage", "請勿留白");
        return next();
      }
      prize = await Prize.create({
        name,
        description: desc,
        imgUrl,
        probability,
      });
    } catch (error) {
      req.flash("errorMessage", "寫入錯誤，稍後再試");
      return next();
    }
    res.redirect("/back-stage");
    return;
  },

  update: async (req, res) => {
    const { id } = req.params;
    let prize = null;
    try {
      prize = await Prize.findOne({
        where: {
          id,
          is_deleted: 0,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "寫入錯誤，稍後再試");
      return next();
    }
    res.render("update", { prize });
    return;
  },

  handleUpdate: async (req, res, next) => {
    const { id } = req.params;
    const { name, desc, imgUrl, probability } = req.body;
    let prize = null;
    try {
      if (!name || !desc || !imgUrl || !probability) {
        req.flash("errorMessage", "請勿留白");
        return next();
      }
      prize = await Prize.findOne({
        where: {
          id,
          is_deleted: 0,
        },
      });
      await prize.update({
        name,
        description: desc,
        imgUrl,
        probability,
      });
    } catch (error) {
      req.flash("errorMessage", "更新錯誤，稍後再試");
      return next();
    }
    res.redirect("/back-stage");
    return;
  },
};

module.exports = prizeController;
