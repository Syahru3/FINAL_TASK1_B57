'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.collections);
    }
  }
  tasks.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameTask: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "collections",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};