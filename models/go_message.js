'use strict';
module.exports = (sequelize, DataTypes) => {
  const go_message = sequelize.define('go_message', {
    name: DataTypes.STRING,
    island_name: DataTypes.STRING,
    memo: DataTypes.STRING,
    goto_id: DataTypes.STRING
  }, {});
  go_message.associate = function(models) {
    go_message.belongsTo(models.come_message);
  };
  return go_message;
};