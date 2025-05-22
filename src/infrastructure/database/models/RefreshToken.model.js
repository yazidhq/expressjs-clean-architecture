"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RefreshToken = sequelize.define(
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
      tableName: "RefreshTokens",
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    }
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return RefreshToken;
};
