const db = require("../models");
const { validationResult } = require('express-validator');
const logger = require('../config/logger.config');
const Record = db.record;

const Op = db.Sequelize.Op;

exports.getRecords = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      logger.error('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: "Query invalid!",
      });
  }
  var whereQuery = []
  
  if ('actorId' in req.query){
    whereQuery.push({actorId: req.query.actorId})
  }
  if ('transaction' in req.query){
    whereQuery.push({transaction: req.query.transaction})
  }
  if ('detail' in req.query){
    whereQuery.push({detail: {[Op.substring]: req.query.detail}})
  }
  if ('date' in req.query){
    whereQuery.push({date: req.query.date})
  }
  if ('tag' in req.query){
    whereQuery.push({tag: {[Op.substring]: req.query.tag}})
  }
  if ('categoryRecordId' in req.query){
    whereQuery.push({categoryRecordId: req.query.categoryRecordId})
  }

  Record.findAll(Object.keys(whereQuery).length !== 0 ? {
      where: {[Op.and]: whereQuery},
      order: [['date', 'ASC']]
    } : undefined)
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "Get financial record success!",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
};

exports.getRecordByID = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      logger.error('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.findOne({
    where: {
      id: req.params.id
    },
  })
  .then((data) => {
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "No match record found with that ID!",
      });
    }

    res.status(200).json({
      status: true,
      message: "Get financial record by ID success!",
      data: data,
    });
  })
  .catch((err) => {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  });
};

exports.postRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      logger.error('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.create({
    actorId: req.body.actorId || req.userId,
    transaction: req.body.transaction,
    value: req.body.value,
    detail: req.body.detail,
    date: req.body.date,
    tag: req.body.tag,
    categoryRecordId: req.body.categoryRecordId,
    photoRecordId: req.body.photoRecordId,
  }).then((data) => {
    res.status(201).json({
      status: true,
      message: "Create financial record success!",
      data: data,
    });
  })
  .catch((err) => {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  });
};

exports.updateRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      logger.error('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then((data) => {
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "No match record found with that ID!",
      });
    }

    Record.update(
      {
        actorId: req.body.actorId,
        transaction: req.body.transaction,
        value: req.body.value,
        detail: req.body.detail,
        date: req.body.date,
        tag: req.body.tag,
        categoryRecordId: req.body.categoryRecordId,
        photoRecordId: req.body.photoRecordId,
      },
      {
        where: { id: req.params.id },
      }
    ).then((data) => {
      res.status(201).json({
        status: true,
        message: "Update financial record success!",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
  })
  .catch((err) => {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  });
};

exports.deleteRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      logger.error('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.findOne({
    where: {
      id: req.params.id
    },
  })
  .then((data) => {
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "No match record found with that ID!",
      });
    }
    Record.destroy({
      where: {
        id: req.params.id
      },
    }).then((data) => {
      res.status(200).json({
        status: true,
        message: "Delete financial record success!",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
  })
  .catch((err) => {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  });
};
