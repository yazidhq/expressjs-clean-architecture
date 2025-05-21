"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    return queryInterface.bulkInsert("user", [
      {
        id: uuidv4(),
        role: "superadmin",
        username: "superadmin",
        email: "superadmin@mail.com",
        password: bcrypt.hashSync("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete("user", null, {});
  },
};
