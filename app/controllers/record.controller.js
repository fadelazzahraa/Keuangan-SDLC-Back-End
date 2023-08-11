const db = require("../models");
const { validationResult } = require('express-validator');
const Record = db.record;

const Op = db.Sequelize.Op;

exports.getRecords = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: "Query invalid!",
      });
  }
  var whereQuery = []
  
  if ('actor' in req.query){
    whereQuery.push({actor: req.query.actor})
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
  if ('sourceRecordId' in req.query){
    whereQuery.push({sourceRecordId: req.query.sourceRecordId})
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
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.findAll({
    where: {
      id: req.params.ID
    },
  })
  .then((data) => {
    if (!data.length) {
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
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.create({
    actor: req.body.actor,
    transaction: req.body.transaction,
    value: req.body.value,
    detail: req.body.detail,
    date: req.body.date,
    tag: req.body.tag,
    sourceRecordId: req.body.sourceRecordId,
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
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.findAll({
    where: {
      id: req.params.ID,
    },
  })
  .then((data) => {
    if (!data.length) {
      return res.status(400).json({
        status: false,
        message: "No match record found with that ID!",
      });
    }

    Record.update(
      {
        actor: req.body.actor,
        transaction: req.body.transaction,
        value: req.body.value,
        detail: req.body.detail,
        date: req.body.date,
        tag: req.body.tag,
        sourceRecordId: req.body.sourceRecordId,
        photoRecordId: req.body.photoRecordId,
      },
      {
        where: { id: req.params.ID },
      }
    ).then((data) => {
      res.status(201).json({
        status: true,
        message: "Update financial record success!",
        data: data,
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
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  Record.findAll({
    where: {
      id: req.params.ID
    },
  })
  .then((data) => {
    if (!data.length) {
      return res.status(400).json({
        status: false,
        message: "No match record found with that ID!",
      });
    }
    Record.destroy({
      where: {
        id: req.params.ID
      },
    }).then((data) => {
      res.status(200).json({
        status: true,
        message: "Delete financial record success!",
        data: data,
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
