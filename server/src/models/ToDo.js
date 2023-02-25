const { Model, DataTypes } = require('sequelize');

class ToDo extends Model {
    static init(sequelize) {
        super.init({
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            defaultValue: "defaultTitle"
          },
          description: {
            type: DataTypes.STRING,
            defaultValue: "defaultDescription"
          },
          isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          }
        }, {
            sequelize,
            tableName: "todo",
            timestamps: false
        })
    }
};

module.exports = ToDo;