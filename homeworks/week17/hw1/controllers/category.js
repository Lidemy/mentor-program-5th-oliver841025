const db = require("../models");
const Article = db.Article;
const User = db.User;
const Category = db.Category;

const categoryController = {
  getAllCategories: async (req, res, next) => {
    let data = null;
    try {
      data = await Category.findAll({
        where: {
          is_deleted: null,
        },
      });
    } catch (error) {
      req.flash("errorMessage", error.toString());
      return next();
    }
    res.render("showCategories", {
      categoryArr: data,
    });
    return;
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;
    let category = null;
    try {
      category = await Category.findOne({
        where: {
          id,
        },
      });
      await category.update({
        is_deleted: 1,
      });
    } catch (error) {
      res.redirect("/show-categories");
      return;
    }
    res.redirect("/show-categories");
    return;
  },

  addCategory: (req, res) => {
    res.render("add_category");
  },

  handleAddCategory: async (req, res, next) => {
    const { category } = req.body;
    if (!category) {
      req.flash("errorMessage", "請確實輸入分類名稱");
      return next();
    }
    try {
      await Category.create({
        categoryName: category,
      });
    } catch (error) {
      req.flash("errorMessage", "寫入錯誤");
      return next();
    }
    res.redirect("/show-categories");
    return;
  },

  updateCategory: async (req, res, next) => {
    const { id } = req.params;
    let category = null;
    try {
      category = await Category.findOne({
        where: {
          id,
          is_deleted: null,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "新增失敗");
      return next();
    }
    res.render("update_category", {
      category,
    });
    return;
  },

  handleUpdateCategory: async (req, res) => {
    const { id } = req.params;
    let category = null;
    try {
      category = await Category.findOne({
        where: {
          id,
          is_deleted: null,
        },
      });
      await category.update({
        categoryName: req.body.category,
      });
    } catch (error) {
      res.redirect("/show-categories");
      return;
    }
    res.redirect("/show-categories");
    return;
  },
};

// 輸出 categoryController
module.exports = categoryController;
