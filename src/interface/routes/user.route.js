/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Managements
 */

const {
  createUser,
  getUsers,
  truncateUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { authentication, restrictTo } = require("../middleware/authentication.middleware");
const auditLog = require("../middleware/auditLog.middleware");

const router = require("express").Router();
const base_url = "/api/user";

router
  .route(`${base_url}/`)

  /**
   * @swagger
   * /api/user/:
   *   post:
   *     summary: Create new user
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
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
   *                 enum: [superadmin, admin, user]
   *                 example: user
   *               username:
   *                 type: string
   *                 example: michael
   *               email:
   *                 type: string
   *                 example: michael@mail.com
   *               password:
   *                 type: string
   *                 example: 123456
   *               confirmPassword:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       201:
   *         description: Success
   *       400:
   *         description: Failed
   */
  .post(authentication, restrictTo("superadmin"), createUser, auditLog("createUser", "user"))

  /**
   * @swagger
   * /api/user/:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Page number for pagination
   *       - in: query
   *         name: size
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of users per page
   *       - in: query
   *         name: filter
   *         schema:
   *           type: string
   *         description: Filter string for searching users (JSON)
   *     responses:
   *       200:
   *         description: User lists
   */
  .get(authentication, restrictTo("superadmin"), getUsers)

  /**
   * @swagger
   * /api/user/:
   *   delete:
   *     summary: Truncate user
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Success
   */
  .delete(authentication, restrictTo("superadmin"), truncateUsers, auditLog("truncateUsers", "user"));

router
  .route(`${base_url}/:id`)

  /**
   * @swagger
   * /api/user/{id}:
   *   get:
   *     summary: Get user by id
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Failed
   */
  .get(authentication, restrictTo("superadmin"), getUserById)

  /**
   * @swagger
   * /api/user/{id}:
   *   patch:
   *     summary: Update user
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               role:
   *                 type: string
   *                 enum: [superadmin, admin, user]
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Success
   */
  .patch(authentication, restrictTo("superadmin"), updateUser, auditLog("updateUser", "user"))

  /**
   * @swagger
   * /api/user/{id}:
   *   delete:
   *     summary: Delete user by id
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   */
  .delete(authentication, restrictTo("superadmin"), deleteUser, auditLog("deleteUser", "user"));

module.exports = (app) => {
  app.use(router);
};
