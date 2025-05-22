"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RateLimitLog = sequelize.define(
    "rate_limit_log",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.STRING,
      },
      endpoint: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      tableName: "RateLimitLog",
      timestamps: true,
    }
  );

  RateLimitLog.associate = (models) => {};

  return RateLimitLog;
};
