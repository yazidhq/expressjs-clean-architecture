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

module.exports = (app) => {
  router
    .route(`${base_url}/`)
    .post(authentication, restrictTo("superadmin"), createUser)
    .get(authentication, restrictTo("superadmin"), getUsers)
    .delete(authentication, restrictTo("superadmin"), truncateUsers);

  router
    .route(`${base_url}/:id`)
    .get(authentication, restrictTo("superadmin"), getUserById)
    .patch(authentication, restrictTo("superadmin"), updateUser)
    .delete(authentication, restrictTo("superadmin"), deleteUser);

  app.use(router);
};
