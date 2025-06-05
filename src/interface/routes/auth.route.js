/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication
 */

const { signUp, signIn, refreshToken, logout } = require("../controllers/auth.controller");

const { validateSignUp, validateSignIn } = require("../validators/auth.validator");

const limiter = require("../middleware/limitter.middleware");
const auditLog = require("../middleware/auditLog.middleware");

const router = require("express").Router();
const base_url = "/api/auth";

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
router.route(`${base_url}/sign-up`).post(validateSignUp, limiter, signUp, auditLog("signUp", "user"));

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Sign in
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
 *         description: Success
 *       401:
 *         description: Failed
 */
router.route(`${base_url}/sign-in`).post(validateSignIn, limiter, signIn, auditLog("signIn", "user"));

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Failed
 */
router.route(`${base_url}/refresh-token`).post(limiter, refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Sign out
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.route(`${base_url}/logout`).post(logout, auditLog("logout", "user"));

module.exports = (app) => {
  app.use(router);
};
