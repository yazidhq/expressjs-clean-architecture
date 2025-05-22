"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const refresh_token = sequelize.define(
    "refresh_token",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Token cannot be null" },
          notEmpty: { msg: "Token cannot be empty" },
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "userId cannot be null" },
          notEmpty: { msg: "userId cannot be empty" },
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "refresh_token",
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    }
  );

  refresh_token.associate = (models) => {
    refresh_token.belongsTo(models.user, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return refresh_token;
};
