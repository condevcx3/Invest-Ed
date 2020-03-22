/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('targetgeography', {
    targetGeography: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'targetgeography'
  });
};
