/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manajemen pengguna
 */

const {
  createUser,
  getUsers,
  truncateUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const {
  authentication,
  restrictTo,
} = require("../middleware/authentication.middleware");

const router = require("express").Router();
const base_url = "/api/user";

router
  .route(`${base_url}/`)

  /**
   * @swagger
   * /api/user/:
   *   post:
   *     summary: Tambah user baru
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
   *         description: User berhasil dibuat
   *       400:
   *         description: Validasi gagal
   */
  .post(authentication, restrictTo("superadmin"), createUser)

  /**
   * @swagger
   * /api/user/:
   *   get:
   *     summary: Ambil semua data user
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Daftar user
   */
  .get(authentication, restrictTo("superadmin"), getUsers)

  /**
   * @swagger
   * /api/user/:
   *   delete:
   *     summary: Hapus semua user
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Semua user berhasil dihapus
   */
  .delete(authentication, restrictTo("superadmin"), truncateUsers);

router
  .route(`${base_url}/:id`)

  /**
   * @swagger
   * /api/user/{id}:
   *   get:
   *     summary: Ambil detail user berdasarkan ID
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
   *         description: Data user ditemukan
   *       404:
   *         description: User tidak ditemukan
   */
  .get(authentication, restrictTo("superadmin"), getUserById)

  /**
   * @swagger
   * /api/user/{id}:
   *   patch:
   *     summary: Perbarui data user
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
   *         description: User diperbarui
   */
  .patch(authentication, restrictTo("superadmin"), updateUser)

  /**
   * @swagger
   * /api/user/{id}:
   *   delete:
   *     summary: Hapus user berdasarkan ID
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
   *         description: User berhasil dihapus
   */
  .delete(authentication, restrictTo("superadmin"), deleteUser);

module.exports = (app) => {
  app.use(router);
};
