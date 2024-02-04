require("dotenv").config();

module.exports = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: '1d',
  refreshTokenExpiresIn: '30d',
  adminPassword: process.env.ADMINPASS,
};
