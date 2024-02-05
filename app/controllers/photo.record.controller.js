const fs = require("fs-extra");
const { validationResult } = require('express-validator');
const logger = require('../config/logger.config');

const db = require("../models");
const PhotoRecord = db.photoRecord;

const Op = db.Sequelize.Op;


exports.getPhotoRecords = (req, res) => {
  var whereQuery = []
  
  if ('detail' in req.query){
    whereQuery.push({detail: {[Op.substring]: req.query.detail}})
  }
  if ('date' in req.query){
    whereQuery.push({date: req.query.date})
  }
  if ('tag' in req.query){
    whereQuery.push({tag: {[Op.substring]: req.query.tag}})
  }

  PhotoRecord.findAll(Object.keys(whereQuery).length !== 0 ? {
      where: {[Op.and]: whereQuery},
    } : undefined)
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "Get photo record success!",
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

exports.getPhotoRecordByID = (req, res) => {
  PhotoRecord.findOne({
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
      message: "Get photo record by ID success!",
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

exports.postPhotoRecord = (req, res) => {
  PhotoRecord.create({
      detail: req.body.detail,
      date: req.body.date,
      tag: req.body.tag,
    }).then((data) => {
      res.status(201).json({
        status: true,
        message: "Create photo record success!",
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

exports.updatePhotoRecord = (req, res) => {
  PhotoRecord.findOne({
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

    PhotoRecord.update(
      {
        detail: req.body.detail,
        date: req.body.date,
        tag: req.body.tag,
      },
      {
        where: { id: req.params.id },
      }
    ).then((_) => {
      res.status(201).json({
        status: true,
        message: "Update photo record success!",
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

exports.deletePhotoRecord = (req, res) => {
  PhotoRecord.findOne({
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
    PhotoRecord.destroy({
      where: {
        id: req.params.id
      },
    }).then((_) => {
      res.status(200).json({
        status: true,
        message: "Delete photo record success!",
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

exports.uploadImage = (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).json({
        status: false,
        message: "You must upload a file",
      });
    } 
    res.status(200).send({
      status: true,
      message: "Upload photo record success!",
      path: req.file.filename,
    });

    // ? IF YOU WANT TO GET FILE SIZE FOR UPLOAD RESULT
    // var filename = `${Date.now()}-${req.file.originalname}-${req.file.size}`;

    // var src = fs.createReadStream(req.file.path);
    // var dest = fs.createWriteStream(`${__basedir}/tmp/${filename}`);

    // src.pipe(dest);

    // src.on("end", function () {
    //   fs.unlinkSync(req.file.path);
    //   res.status(200).send({
    //     status: true,
    //     message: "Upload photo record success!",
    //     path: filename,
    //   });
    // });

    // src.on("error", function (err) {
    //   fs.unlinkSync(req.file.path);
    //   console.log(err);
    //   res.status(500).send({
    //     status: false,
    //     message: err.message,
    //   });
    // });

  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
}

exports.setImage = (req, res) => {
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
  PhotoRecord.findOne({
    raw: true,
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
    
    try {
      var oldimage = data.image || "";
      var newimage = req.body.path.slice(0, -4) + ".jpg"

      var oldimagepath = __basedir + "/uploads/" + oldimage;
      var src = __basedir + "/tmp/" + req.body.path;
      var dest = __basedir + "/uploads/" + newimage;
  
      if (fs.existsSync(src)) {
        fs.move(src, dest, (err) => {
          if (err) return res.status(400).json({
            status: false,
            message: err.message,
          });

          if (fs.existsSync(oldimagepath)) {
            fs.remove(oldimagepath, (err) => {
              if (err) return res.status(400).json({
                status: false,
                message: err.message,
              });
            });
          }
          PhotoRecord.update(
            {
              image: newimage,
            },
            {
              where: { id: req.params.id },
            }
          ).then((_) => {
            res.status(201).json({
              status: true,
              message: "Set image of photo record success!",
            });
          })
          .catch((err) => {
            res.status(400).json({
              status: false,
              message: err.message,
            });
          });
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "File not found",
        });
      }

    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  })
  .catch((err) => {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  });

  
};

exports.downloadImage = (req, res) => {
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

  PhotoRecord.findOne({
    raw: true,
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
    var image = data.image;
    
    if (image == null){
      return res.status(404).json({
        status: false,
        message: "No image set for this photo record",
      });
    }

    try {
      var imagepath = __basedir + "/uploads/" + image;

      return res.status(200).download(imagepath);
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  })
  .catch((err) => {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  });

  
};



