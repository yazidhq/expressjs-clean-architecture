const { Sequelize } = require("sequelize");
const config = require("./db.config");

const env = process.env.NODE_ENV || "development";

exports.sequelize = new Sequelize(config[env]);
