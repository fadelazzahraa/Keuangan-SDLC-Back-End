const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const revokedTokens = new Set();

verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) return res.status(401).send({ 
    status: false,
    message: 'Unauthorized' 
  });

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      status: false,
      message: "No token provided!",
    });
  }

  // Check if the token is revoked
  if (revokedTokens.has(token)) { 
    return res.status(401).json({ 
      status: false,
      message: 'Token has been revoked' });
  }

  jwt.verify(
    token, 
    config.accessTokenSecret, 
    (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized!",
      });
    }
    console.log(decoded);
    req.userId = decoded.UserInfo.id;
    next();
  });
};


const authJwt = {
  verifyToken,
  revokedTokens,
};
module.exports = authJwt;
