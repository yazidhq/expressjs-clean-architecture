const {
  signUp,
  signIn,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");

const {
  validateSignUp,
  validateSignIn,
} = require("../validators/auth.validator");

const limiter = require("../middleware/limitter.middleware");

const router = require("express").Router();
const base_url = "/api/auth";

module.exports = (app) => {
  router.route(`${base_url}/sign-up`).post(validateSignUp, limiter, signUp);
  router.route(`${base_url}/sign-in`).post(validateSignIn, limiter, signIn);
  router.route(`${base_url}/refresh-token`).post(limiter, refreshToken);
  router.route(`${base_url}/logout`).post(logout);

  app.use(router);
};
