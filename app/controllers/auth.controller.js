require("dotenv").config();

const db = require("../models");
const config = require("../config/auth.config");
const authjwt = require("../middleware/authjwt.middleware");
const User = db.user;


const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    var role = "user";
    if ('adminPass' in req.body){
      console.log(req.body.adminPass);
      if (req.body.adminPass == process.env.ADMINPASS){
        role = "admin";
      } else {
        return res.status(401).send({
          status: false,
          message: "Invalid admin password!",
        });
      }
    }

    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      role: role,
    });
    
    res.status(201).send({
      status: "true",
      message: role == "user" ? "User registered successfully!" : "Admin registered successfully!",
    });

  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found!",
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: false,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).send({
      status: true,
      message: "Login success!",
      token: token,
      id: user.id,
      role: user.role
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.signout = async (req, res) => {
  const tokenToRevoke = req.body.token;

  revokedTokens.add(tokenToRevoke);

  try {
    return res.status(200).send({
      status: true,
      message: "You've been signed out!",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.revokeToken = async (req, res) => {
  // check req.body.token. if empty, use req.get("Authorization")
  const tokenToRevoke = req.body.token || req.get("Authorization");

  if (!tokenToRevoke) {
    return res.status(400).json({ 
      status: false,
      message: 'Token not provided' });
  }

  authjwt.revokedTokens.add(tokenToRevoke);
  res.status(200).json({ 
    status: true,
    message: 'Token revoked successfully' });
};