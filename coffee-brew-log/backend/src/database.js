const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production'
        ? { require: true, rejectUnauthorized: false }
        : false,
    },
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './brews.sqlite',
    logging: false,
  });
}

module.exports = sequelize;
