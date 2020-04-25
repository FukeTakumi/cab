'use strict';
module.exports = (sequelize, DataTypes) => {
  const come_message = sequelize.define('come_message', {
    name: DataTypes.STRING,
    island_name: DataTypes.STRING,
    fruit: DataTypes.STRING,
    cab_status: DataTypes.STRING,
    cab_bell: DataTypes.INTEGER,
    want: DataTypes.STRING,
    pass: DataTypes.STRING,
    postdate:DataTypes.STRING
  }, {
    underscored: true,
  });
  come_message.associate = function(models) {
    come_message.hasMany(models.go_message);
  };
  return come_message;
};