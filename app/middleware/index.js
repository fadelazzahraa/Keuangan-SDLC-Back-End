const authJwt = require("./authjwt.middleware");
const verifySignUp = require("./verifysignup.middleware");
const upload = require("./upload.middleware");

module.exports = {
  authJwt,
  verifySignUp,
  upload,
};
