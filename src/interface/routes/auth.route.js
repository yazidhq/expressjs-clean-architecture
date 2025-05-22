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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication
 */

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               role:
 *                 type: string
 *                 example: user
 *               username:
 *                 type: string
 *                 example: michael
 *               email:
 *                 type: string
 *                 example: michael@mail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               confirmPassword:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Failed
 */
router.route(`${base_url}/sign-up`).post(validateSignUp, limiter, signUp);

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: michael@mail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Kredensial salah
 */
router.route(`${base_url}/sign-in`).post(validateSignIn, limiter, signIn);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh token akses
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token baru dikembalikan
 *       403:
 *         description: Refresh token tidak valid
 */
router.route(`${base_url}/refresh-token`).post(limiter, refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout pengguna
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout berhasil
 */
router.route(`${base_url}/logout`).post(logout);

module.exports = (app) => {
  app.use(router);
};
