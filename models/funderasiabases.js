/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funderasiabases', {
    funderName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    asiaBase: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'funderasiabases'
  });
};
