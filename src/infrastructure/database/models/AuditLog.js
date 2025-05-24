"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const audit_log = sequelize.define(
    "audit_log",
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      ipAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userAgent: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      action: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tableName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      recordId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      oldValue: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      newValue: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      tableName: "audit_log",
      timestamps: true,
    }
  );

  audit_log.associate = (models) => {};

  return audit_log;
};
