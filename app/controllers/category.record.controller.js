const db = require("../models");
const { validationResult } = require('express-validator');
const categoryRecord = db.categoryRecord;
const logger = require('../config/logger.config');

const Op = db.Sequelize.Op;

exports.getCategoryRecords = (req, res) => {
  categoryRecord.findAll()
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "Get category record success!",
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

exports.postCategoryRecord = (req, res) => {
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
  categoryRecord.create({
    categoryType: req.body.categoryType,
    category: req.body.category,
  }).then((data) => {
    res.status(201).json({
      status: true,
      message: "Create category record success!",
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

exports.updateCategoryRecord = (req, res) => {
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
  categoryRecord.findOne({
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

    categoryRecord.update(
      {
        categoryRecord: req.body.categoryRecord,
        category: req.body.category,
      },
      {
        where: { id: req.params.id },
      }
    ).then((data) => {
      res.status(201).json({
        status: true,
        message: "Update category record success!",
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

exports.deleteCategoryRecord = (req, res) => {
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
  categoryRecord.findOne({
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
    categoryRecord.destroy({
      where: {
        id: req.params.id
      },
    }).then((data) => {
      res.status(200).json({
        status: true,
        message: "Delete category record success!",
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
