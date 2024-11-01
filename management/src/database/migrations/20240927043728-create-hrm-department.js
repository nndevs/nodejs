'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HRMDepartments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      tenant_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      handle: {
        allowNull: true,
        type: Sequelize.STRING(120)
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      parent_id: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      }
    });

    // Adding a unique constraint on tenant_id and handle
    await queryInterface.addConstraint('HRMDepartments', {
      fields: ['tenant_id', 'handle'],
      type: 'unique',
      name: 'unique_tenant_id_handle_departments',
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the unique constraint
    await queryInterface.removeConstraint('HRMDepartments', 'unique_tenant_id_handle_departments');

    await queryInterface.dropTable('HRMDepartments');
  }
};