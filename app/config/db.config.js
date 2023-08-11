require("dotenv").config();

module.exports = {
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
