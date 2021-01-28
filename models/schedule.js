module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define("Schedule", {
    monday: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
    tuesday: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
    wednesday: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
    thursday: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
    friday: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
  });
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.Child, {
      foreignKey: { allowNull: true, defaultValue: 0 },
      onDelete: "cascade",
    });
  };

  return Schedule;
};
