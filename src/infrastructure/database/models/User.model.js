"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const AppError = require("../../../shared/utils/appError.util");

module.exports = (sequelize) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("superadmin", "admin", "user"),
        allowNull: false,
        validate: {
          notNull: { msg: "Role cannot be null" },
          notEmpty: { msg: "Role cannot be empty" },
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Username cannot be null" },
          notEmpty: { msg: "Username cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password cannot be null" },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        set(value) {
          if (value !== this.password) {
            throw new AppError(
              "Password and confirm password must be the same",
              400
            );
          }
          if (value.length < 7) {
            throw new AppError("Password length must be greater than 7", 400);
          }
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
    },
    {
      tableName: "user",
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.refresh_token, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return user;
};
