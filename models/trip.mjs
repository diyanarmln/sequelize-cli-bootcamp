export default function initTripModel(sequelize, DataTypes) {
  return sequelize.define('trip', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
