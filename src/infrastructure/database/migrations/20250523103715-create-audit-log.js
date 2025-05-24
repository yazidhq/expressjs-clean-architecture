'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audit_logs', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      ipAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userAgent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      action: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tableName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      recordId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      oldValue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      newValue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('audit_logs');
  }
};