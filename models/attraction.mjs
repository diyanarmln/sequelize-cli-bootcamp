export default function initAttractionModel(sequelize, DataTypes) {
  return sequelize.define('attraction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trips',
        key: 'id',
      },
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'attractions',
        key: 'id',
      },
    },
  }, {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
