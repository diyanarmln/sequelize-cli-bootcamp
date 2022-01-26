import db from './models/index.mjs';

const command = process.argv[2];

if (command === 'create') { db.Trip
  .create({
    name: process.argv[3],
    created_at: Date.now(),
    updated_at: Date.now(),
  })
  .then((trip) => {
    console.log('success');
    console.log(trip);
  })
  .catch((error) => console.log(error)); }

if (command === 'add-attrac') {
  const tripName = process.argv[3];
  let retriveTripId;

  db.Trip.findAll({
    attributes: ['id'],
    where: {
      name: [tripName],
    },
  })
    .then((trips) => {
      retriveTripId = trips[0].dataValues.id;
      return db.Attraction
        .create({
          name: process.argv[4],
          trip_id: retriveTripId,
          created_at: Date.now(),
          updated_at: Date.now(),
        })
        .then((attraction) => {
          console.log('success');
          console.log(attraction);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

if (command === 'trip') {
  const tripName = process.argv[3];
  let retrieveTripId;

  db.Trip.findAll({
    attributes: ['id'],
    where: {
      name: [tripName],
    },
  })
    .then((trips) => {
      retrieveTripId = trips[0].dataValues.id;
      return db.Attraction
        .findAll({
          attributes: ['name'],
          where: {
            trip_id: retrieveTripId,
          },
        })
        .then((attraction) => {
          console.log(attraction[0].dataValues.name);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}
