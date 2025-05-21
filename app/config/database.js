const { Sequelize } = require("sequelize");
const { development } = require("./db.config");

const env = process.env.NODE_ENV || development;
const config = require("./db.config");

exports.sequelize = new Sequelize(config[env]);
