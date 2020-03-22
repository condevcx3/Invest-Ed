/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tuitionsource', {
    tuitionSource: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'tuitionsource'
  });
};
