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
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
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
