require("dotenv").config();

const mailConfig = {
  development: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    from: process.env.MAIL_FROM,
  },
  production: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    from: process.env.MAIL_FROM,
  },
};

const env = process.env.NODE_ENV || "development";

module.exports = mailConfig[env];
