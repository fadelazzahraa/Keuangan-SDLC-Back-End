require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookie = require('cookie');

const db = require("../models");
const config = require("../config/auth.config");
const authjwt = require("../middleware/authjwt.middleware");
const logger = require('../config/logger.config.js');
const User = db.user;

const Op = db.Sequelize.Op;


exports.signup = async (req, res) => {
  try {
    var role = "user";
    if ('adminPass' in req.body){
      console.log(req.body.adminPass);
      logger.info(`Attempted admin registration with password: ${req.body.adminPass}`);
      if (req.body.adminPass == config.adminPassword){
        role = "admin";
      } else {
        return res.status(401).send({
          status: false,
          message: "Invalid admin password!",
        });
      }
    }

    await User.create({
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

exports.login = async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    console.log(cookies);
    logger.info(`Cookies: ${cookies}`);

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(401).send({
        status: false,
        message: "Invalid credentials!",
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: false,
        message: "Invalid credentials!",
      });
    }

    const accessToken = jwt.sign(
      {
          "UserInfo": {
              "id": user.id,
              "username": user.username,
              "roles": user.role
          }
      },
      config.accessTokenSecret,
      { expiresIn: config.accessTokenExpiresIn }
    );

    const newRefreshToken = jwt.sign(
      { "username": user.username },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenExpiresIn }
    );

    // Changed to let keyword
    let refreshToken;

    if (!cookies?.jwt) {
      refreshToken = newRefreshToken;
    } else {
      refreshToken = cookies.jwt;
      const foundToken = await User.findOne({
        where: {
          refreshToken: refreshToken,
        },
      });

      if (!foundToken) {
          console.log('Attempted refresh token use at login!')
          logger.error('Attempted refresh token use at login!');
          refreshToken = null;
      }

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.status(401).send({
        status: false,
        message: "Attempted refresh token use at login!",
      });
    }

    User.update(
      {
        refreshToken: newRefreshToken,
      },
      {
        where: { id: user.id },
      }
    ).then((data) => {
      console.log('Refresh token updated successfully!');
      logger.info('Refresh token updated successfully!');
    })

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send authorization roles and access token to user
    res.status(200).send({
      status: true,
      message: "Login success!",
      token: accessToken,
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

exports.logout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log(cookies);
  logger.info(`Cookies: ${cookies}`);
  if (!cookies?.jwt) return res.status(200).send({
    status: false,
    message: "No cookie provided!"
  });
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const user = await User.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(200).send({
      status: false,
      message: "Invalid token!"
    });
  }

  // Delete refreshToken in db
  User.update(
    {
      refreshToken: null
    },
    {
      where: { id: user.id },
    }
  ).then((data) => {
    console.log('Refresh token cleared successfully!');
    logger.info('Refresh token cleared successfully!');
  })

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(200).send({
    status: true,
    message: "Logout success!"
  });
};

exports.refreshRefreshToken = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log(cookies);
  logger.info(`Cookies: ${cookies}`);
  if (!cookies?.jwt) return res.status(200).send({
    status: false,
    message: "No cookie provided!"
  });

  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  // Detected refresh token reuse!
  // check if refreshToken is in db
  const user = await User.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  // if not, it means the token was already deleted but used again
  if (!user) {
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).send({
                status: false,
                message: "Invalid token!" 
            });
            console.log('Attempted invalid refresh token reuse!')
            logger.error('Attempted invalid refresh token reuse!');
            const hackedUser = await User.findOne({
              where: {
                username: decoded.UserInfo.username
              },
            });

            User.update(
              {
                refreshToken: null
              },
              {
                where: { id: hackedUser.id },
              }
            ).then((data) => {
              console.log('Refresh token updated successfully!');
              logger.info('Refresh token updated successfully!');
            });
        }
    )
    return res.status(403).send({
      status: false,
      message: "Forbidden!"
    }); 
  }

  // Evaluate JWT Token 
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      // Refresh token is invalid because it's expired
      if (err) {
          console.log('Expired refresh token')
          logger.error('Expired refresh token');
          User.update(
            {
              refreshToken: null
            },
            {
              where: { id: user.id },
            }
          ).then((data) => {
            console.log('Refresh token updated successfully!');
            logger.info('Refresh token updated successfully!');
          });
      }
      // Refresh token is invalid because it's not matched with the user (but this case should be not happenned because we store refresh token in correct user's record in db)
      if (err || user.username !== decoded.UserInfo.username) return res.status(403).send({
          status: false,
          message: "Mismatch token!"
      });

      // If refresh token was still valid, refresh the access token and refresh token
      const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": user.id,
                "username": user.username,
                "roles": user.role
            }
        },
        config.accessTokenSecret,
        { expiresIn: config.accessTokenExpiresIn }
      );

      const newRefreshToken = jwt.sign(
        { "username": user.username },
        config.refreshTokenSecret,
        { expiresIn: config.refreshTokenExpiresIn }
      );

      // Saving refreshToken with current user
      User.update(
        {
          refreshToken: newRefreshToken,
        },
        {
          where: { id: user.id },
        }
      ).then((data) => {
        console.log('Refresh token updated successfully!');
        logger.info('Refresh token updated successfully!');
      })

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      return res.status(200).send({
        status: true,
        message: "Refresh token success!",
        token: accessToken,
        id: user.id,
        role: user.role
      });
    }
  ); 
};

exports.getAccessToken = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log(cookies);
  logger.info(`Cookies: ${cookies}`);
  if (!cookies?.jwt) return res.status(200).send({
    status: false,
    message: "No cookie provided!"
  });

  const refreshToken = cookies.jwt;

  // Detected refresh token deleted but reused!
  // check if refreshToken is in db
  const user = await User.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  // if not, it means the token was already deleted but used again
  if (!user) {
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).send({
                status: false,
                message: "Invalid token!" 
            });
            console.log('Attempted invalid refresh token reuse!')
            logger.error('Attempted invalid refresh token reuse!');
            const hackedUser = await User.findOne({
              where: {
                username: decoded.UserInfo.username
              },
            });

            User.update(
              {
                refreshToken: null
              },
              {
                where: { id: hackedUser.id },
              }
            ).then((data) => {
              console.log('Refresh token updated successfully!');
              logger.info('Refresh token updated successfully!');
            });
        }
    )
    return res.status(403).send({
      status: false,
      message: "Forbidden!"
    }); 
  }

  // Evaluate JWT Token 
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      // Refresh token is invalid because it's expired
      if (err) {
          console.log('Expired refresh token');
          logger.error('Expired refresh token');
          User.update(
            {
              refreshToken: null
            },
            {
              where: { id: user.id },
            }
          ).then((data) => {
            console.log('Refresh token updated successfully!');
            logger.info('Refresh token updated successfully!');
          });
      }
      // Refresh token is invalid because it's not matched with the user (but this case should be not happenned because we store refresh token in correct user's record in db)
      if (err || user.username !== decoded.UserInfo.username) return res.status(403).send({
          status: false,
          message: "Mismatch token!"
      });

      // If refresh token was still valid
      const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": user.id,
                "username": user.username,
                "roles": user.role
            }
        },
        config.accessTokenSecret,
        { expiresIn: config.accessTokenExpiresIn }
      );
      
      return res.status(200).send({
        status: true,
        message: "Get new access token success!",
        token: accessToken,
        id: user.id,
        role: user.role
      });
    }
  ); 
};