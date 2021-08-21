const db = require("../models");
const Article = db.Article;
const User = db.User;
const Category = db.Category;

const articleController = {
  getAllArticles: async (req, res, next) => {
    // show 出所有文章
    let articles = null;
    try {
      articles = await Article.findAll({
        where: {
          is_deleted: null,
        },
        order: [["id", "DESC"]],
        include: User,
        include: Category,
      });
    } catch (error) {
      req.flash("errorMessage", "系統錯誤");
      return next();
    }
    if (!articles.length) {
      res.end();
      return;
    }
    res.render("index", {
      articles,
    });
    return;
  },

  getSingleArticle: async (req, res) => {
    const { id } = req.params;
    let article = null;
    try {
      article = await Article.findOne({
        where: {
          is_deleted: null,
          id,
        },
        include: Category,
      });
    } catch (error) {
      req.flash("errorMessage", "載入錯誤");
      return next();
    }
    if (!article) {
      req.flash("errorMessage", "系統錯誤");
      return next();
    }
    res.render("show_single_article", {
      article,
    });
    return;
  },

  addArticle: async (req, res, next) => {
    // 找到 category 傳過去
    let data = null;
    try {
      data = await Category.findAll({
        where: {
          is_deleted: null,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "載入錯誤");
      return next();
    }
    if (!data) {
      req.flash("errorMessage", "錯誤");
      return next();
    }
    res.render("add_article", {
      categoryArr: data,
    });
    return;
  },

  handleAddArticle: async (req, res, next) => {
    const { title, content, categoryId } = req.body;
    // 確認輸入的值 title, content, categoryName 不為空
    if (!title || !content) {
      req.flash("errorMessage", "欄位請勿留白");
      return next();
    }
    // 寫入資料庫
    try {
      await Article.create({
        title,
        content,
        CategoryId: categoryId,
        UserId: req.session.userId,
      });
    } catch (error) {
      req.flash("errorMessage", "錯誤，新增失敗");
      return next();
    }
    res.redirect("/");
    return;
  },

  showArticlesList: async (req, res, next) => {
    let articles = null;
    try {
      articles = await Article.findAll({
        where: {
          is_deleted: null,
        },
        include: Category,
      });
    } catch (error) {
      req.flash("errorMessage", "讀取錯誤");
      return next();
    }
    res.render("show_articles_list", {
      articles,
    });
    return;
  },

  backShowArticles: async (req, res, next) => {
    let articles = null;
    try {
      articles = await Article.findAll({
        where: {
          is_deleted: null,
          UserId: req.session.userId,
        },
        include: Category,
      });
    } catch (error) {
      req.flash("errorMessage", "讀取錯誤");
      return next();
    }
    res.render("back_show_articles", {
      articles,
    });
    return;
  },

  deleteArticle: async (req, res, next) => {
    const { id } = req.params;
    const UserId = req.session.userId;
    let article = null;
    try {
      article = await Article.findOne({
        where: {
          id,
        },
      });
      await article.update({
        is_deleted: 1,
      });
    } catch (error) {
      req.flash("errorMessage", "作業錯誤");
      return next();
    }
    return next();
  },

  updateArticle: async (req, res, next) => {
    const { id } = req.params;
    let articleData = null;
    let categoryData = null;
    try {
      articleData = await Article.findOne({
        where: {
          id,
          is_deleted: null,
          UserId: req.session.userId,
        },
        include: Category,
      });
      categoryData = await Category.findAll({
        where: {
          is_deleted: null,
        },
      });
    } catch (error) {
      req.flash("errorMessage", "發生錯誤");
      return next();
    }
    res.render("update_article", {
      article: articleData,
      categoryArr: categoryData,
    });
    return;
  },

  handleUpdateArticle: async (req, res, next) => {
    const { id } = req.params;
    const { category_id, title, content } = req.body;
    let article = null;
    if (!category_id || !title || !content) {
      req.flash("errorMessage", "請勿留白");
      return next();
    }
    try {
      article = await Article.findOne({
        where: {
          id,
        },
      });
      await article.update({
        title,
        content,
        CategoryId: category_id,
      });
    } catch (error) {
      req.flash("errorMessage", "更新錯誤");
      return next();
    }
    res.redirect("/");
    return;
  },
};

// 輸出 articleController
module.exports = articleController;
