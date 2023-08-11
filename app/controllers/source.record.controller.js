const db = require("../models");
const { validationResult } = require('express-validator');
const SourceRecord = db.sourceRecord;

const Op = db.Sequelize.Op;

exports.getSourceRecords = (req, res) => {
  SourceRecord.findAll()
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "Get source record success!",
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

exports.postSourceRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  SourceRecord.create({
    sourceType: req.body.sourceType,
    source: req.body.source,
  }).then((data) => {
    res.status(201).json({
      status: true,
      message: "Create source record success!",
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

exports.updateSourceRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  SourceRecord.findAll({
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

    SourceRecord.update(
      {
        sourceType: req.body.sourceType,
        source: req.body.source,
      },
      {
        where: { id: req.params.ID },
      }
    ).then((data) => {
      res.status(201).json({
        status: true,
        message: "Update source record success!",
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

exports.deleteSourceRecord = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log('Query error', errors.array());
      return res.status(422).send(
      {
        status: false,
        message: errors.array()[0]['msg'],
      });
  }
  SourceRecord.findAll({
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
    SourceRecord.destroy({
      where: {
        id: req.params.ID
      },
    }).then((data) => {
      res.status(200).json({
        status: true,
        message: "Delete source record success!",
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
