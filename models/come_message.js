'use strict';
module.exports = (sequelize, DataTypes) => {
  const come_message = sequelize.define('come_message', {
    name: DataTypes.STRING,
    island_name: DataTypes.STRING,
    cab_status: DataTypes.STRING,
    cab_bell: DataTypes.INTEGER,
    want: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {});
  come_message.associate = function(models) {
    // associations can be defined here
  };
  return come_message;
};