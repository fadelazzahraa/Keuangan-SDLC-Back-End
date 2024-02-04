const config = require("../config/db.config.js");
const logger = require('../config/logger.config.js');

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.record = require("../models/record.model.js")(sequelize, Sequelize);
db.categoryRecord = require("./category.record.model.js")(sequelize, Sequelize);
db.photoRecord = require("../models/photo.record.model.js")(sequelize, Sequelize);

db.record.belongsTo(db.categoryRecord);
db.categoryRecord.hasMany(db.record, { as: "records" });

db.record.belongsTo(db.photoRecord);
db.photoRecord.hasMany(db.record, { as: "records" });

db.record.belongsTo(db.user, { foreignKey: 'actorId' });
db.user.hasMany(db.record, {foreignKey: 'actorId'});

module.exports = db;
