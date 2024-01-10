const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

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
  checkDuplicateUsername
};

module.exports = verifySignUp;
