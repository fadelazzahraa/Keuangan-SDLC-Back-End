const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        status: false,
        message: "Failed! Username is already in use!",
      });
    }

    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        status: false,
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

checkDuplicateUsername = async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        status: false,
        message: "Failed! Username is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateUsername
};

module.exports = verifySignUp;
