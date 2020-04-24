'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('go_messages','goto_id', {
      allowNull:false,
      type:Sequelize.INTEGER,
      references:{
        model:'come_messages',
        key:'id'
      },
      onUpdate:'cascade',
      onDelete:'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('go_messages','goto_id');
  }
};
