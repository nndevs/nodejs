'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HRMDesignations', {
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
      department_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'HRMDepartments',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
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
    await queryInterface.addConstraint('HRMDesignations', {
      fields: ['tenant_id', 'handle'],
      type: 'unique',
      name: 'unique_tenant_id_handle_designations',
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the unique constraint
    await queryInterface.removeConstraint('HRMDesignations', 'unique_tenant_id_handle_designations');

    await queryInterface.dropTable('HRMDesignations');
  }
};