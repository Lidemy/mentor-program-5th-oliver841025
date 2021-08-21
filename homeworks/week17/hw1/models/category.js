"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Article);
    }
  }
  Category.init(
    {
      categoryName: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
