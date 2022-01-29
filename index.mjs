import db from './models/index.mjs';

const command = process.argv[2];
const values = process.argv.slice(3);

const funcObj = {
  create: (input) => {
    db.Trip
      .create({
        name: input[0],
        // created_at: Date.now(),
        // updated_at: Date.now(),
      })
      .then((trip) => {
        console.log('create trip success');
        console.log(trip);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'add-attrac': (input) => {
    let retriveTripId;
    let retrieveCategoryId;

    db.Trip.findAll({
      attributes: ['id'],
      where: {
        name: input[0],
      },
    })
      .then((trips) => {
        retriveTripId = trips[0].dataValues.id;
        return db.Category.findAll({
          attributes: ['id'],
          where: {
            name: input[2],
          },
        }).then((categories) => {
          retrieveCategoryId = categories[0].dataValues.id;
          return db.Attraction
            .create({
              name: input[1],
              trip_id: retriveTripId,
              created_at: Date.now(),
              updated_at: Date.now(),
              category_id: retrieveCategoryId,
            })
            .then((attraction) => {
              console.log('success');
              console.log(attraction);
              db.sequelize.close();
            })
            .catch((error) => console.log(error));
        })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  trip: (input) => {
    // const tripName = input[0];
    let retrieveTripId;

    db.Trip.findAll({
      attributes: ['id'],
      where: {
        name: input[0],
      },
    })
      .then((trips) => {
        retrieveTripId = trips[0].dataValues.id;
        console.log(retrieveTripId);
        return db.Attraction
          .findAll({
            attributes: ['name'],
            where: {
              trip_id: retrieveTripId,
            },
          })
          .then((attractions) => {
            attractions.forEach((attraction) => {
              console.log(attraction.name);
            });
            // console.log(attraction[0].dataValues.name);
            db.sequelize.close();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  'add-category': (input) => {
    db.Category.create({
      name: input[0],
      created_at: Date.now(),
      updated_at: Date.now(),
    }).then((categories) => {
      console.log('category created');
      console.log(categories);
    }).catch((error) => console.log(error));
  },
  'category-trip': (input) => {
    let retrieveTripId;
    let retrieveCategoryId;

    db.Trip.findAll({
      attributes: ['id'],
      where: {
        name: input[0],
      },
    })
      .then((trips) => {
        retrieveTripId = trips[0].dataValues.id;
        return db.Category.findAll({
          attributes: ['id'],
          where: {
            name: input[1],
          },
        }).then((categories) => {
          retrieveCategoryId = categories[0].dataValues.id;
          return db.Attraction
            .findAll({
              attributes: ['name'],
              where: {
                trip_id: retrieveTripId,
                category_id: retrieveCategoryId,
              },
            })
            .then((attractions) => {
              console.log('success');
              attractions.forEach((attraction) => {
                console.log(attraction.name);
              });
              db.sequelize.close();
            })
            .catch((error) => console.log(error));
        })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },
  'category-attractions': (input) => {
    let retrieveCategoryId;

    db.Category.findAll({
      attributes: ['id'],
      where: {
        name: input[0],
      },
    }).then((categories) => {
      retrieveCategoryId = categories[0].dataValues.id;
      return db.Attraction
        .findAll({
          attributes: ['name'],
          where: {
            category_id: retrieveCategoryId,
          },
        })
        .then((attractions) => {
          console.log('success');
          // console.log(attraction[0].dataValues.name);
          attractions.forEach((attraction) => {
            console.log(attraction.name);
          });
          db.sequelize.close();
        })
        .catch((error) => console.log(error));
    })
      .catch((error) => console.log(error));
  },
};

if (!(command in funcObj)) {
  console.log('invalid command');
  process.exit();
}

funcObj[command](values);
