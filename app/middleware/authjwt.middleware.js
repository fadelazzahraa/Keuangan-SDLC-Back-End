const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");


const revokedTokens = new Set();

verifyToken = (req, res, next) => {
  let token = req.get("Authorization");

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  // Check if the token is revoked
  if (revokedTokens.has(token)) {
    return res.status(401).json({ 
      status: false,
      message: 'Token has been revoked' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken,
  revokedTokens,
};
module.exports = authJwt;
