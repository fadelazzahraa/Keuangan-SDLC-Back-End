require("dotenv").config();
const logger = require('./logger.config.js');

const config = {
  HOST: process.env.DATABASEHOST,
  USER: process.env.DATABASEUSER,
  PASSWORD: process.env.DATABASEPASSWORD,
  DB: process.env.DATABASENAME,
  PORT: process.env.DATABASEPORT,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  port: config.PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logging: (message) => {
    // Log Sequelize queries using Winston
    logger.info(message);
  },
});

module.exports = {
    Sequelize,
    sequelize,
};