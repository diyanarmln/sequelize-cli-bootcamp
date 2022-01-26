import sequelizePackage from 'sequelize';
import allConfig from '../config/config.js';

import initTripModel from './trip.mjs';
import initAttractionModel from './attraction.mjs';

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.Item = initTripModel(sequelize, Sequelize.DataTypes);
db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);

// The following 2 lines enable Sequelize to recognise the 1-M relationship
// between Item and Category models, providing the mixin association methods.
db.Attraction.belongsTo(db.Trip);
db.Trip.hasMany(db.Attraction);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

db.Trip
  .create({
    name: process.argv[2],
  })
  .then((trip) => {
    console.log('success');
    console.log(trip);
  })
  .catch((error) => console.log(error));
