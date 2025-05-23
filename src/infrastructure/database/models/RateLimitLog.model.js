"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const rate_limit_log = sequelize.define(
    "rate_limit_log",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      ipAddress: {
        type: DataTypes.STRING,
      },
      endpoint: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      tableName: "rate_limit_log",
      timestamps: true,
    }
  );

  rate_limit_log.associate = (models) => {};

  return rate_limit_log;
};
