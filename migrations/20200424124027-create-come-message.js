'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('come_messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      island_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fruit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cab_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cab_bell: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      want: {
        type: Sequelize.STRING
      },
      pass: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('come_messages');
  }
};