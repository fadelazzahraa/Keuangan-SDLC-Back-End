const e = require("express");
const db = require("../models");
const bcrypt = require("bcryptjs");

const User = db.user;

const Op = db.Sequelize.Op;

exports.getUserProfile = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.body.id || req.userId,
    },
  });

  if (!user) {
    return res.status(404).send({
      status: false,
      message: "User not found!",
    });
  } else {
    const userdata = user.dataValues;
    try {
      return res.status(200).send({
        status: true,
        message: "Get user profile success!",
        data: {
          id: userdata.id,
          username: userdata.username,
        },
      });
    } catch (err) {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    }
  }
};

exports.postUserProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id || req.userId,
    },
  })
    .then(async (user) => {
      const dataUser = user.dataValues;
      const dataUpdate = {
        username: req.body.username ? req.body.username : dataUser.username,
      };
      User.update(dataUpdate, {
        where: {
          id: req.body.id || req.userId,
        },
      })
        .then((x) => {
          res.status(200).send({
            status: true,
            message: "Edit user profile success!",
          });
        })
        .catch((err) => {
          res.status(400).send({
            status: false,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: err.message,
      });
    });
};

exports.getUser = async (req, res) => {
  const user = await User.findAll({
    attributes: ['id', 'username', 'role']
  });
  try {
    return res.status(200).send({
      status: true,
      message: "Get user success!",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

exports.changepassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found!",
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.oldpassword, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: false,
        message: "Invalid old password!",
      });
    }

    const dataUpdate = {
      password: bcrypt.hashSync(req.body.newpassword, 8),
    };

    User.update(dataUpdate, {
      where: {
        id: req.userId
      },
    });

    return res.status(200).send({
      status: true,
      message: "Change user password success!",
    });

  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.changerole = async (req, res) => {
  try {
    const admin = await User.findOne({
      where: {
        id: req.userId
      },
    });

    if (admin.role != "admin") {
      return res.status(404).send({
        status: false,
        message: "You're not admin!",
      });
    }

    const user = await User.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found!",
      });
    }

    const dataUpdate = {
      role: user.role == "user" ? "admin" : "user" 
    };

    User.update(dataUpdate, {
      where: {
        id: req.body.id
      },
    });

    return res.status(200).send({
      status: true,
      message: "Change user role success!",
    });

  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};