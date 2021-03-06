'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativetargetgeography', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    targetGeography: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'initiativetargetgeography'
  });
};
