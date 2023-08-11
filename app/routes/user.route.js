const { authJwt, upload, verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/user/profile", [authJwt.verifyToken], controller.getUserProfile);

  app.post("/user/profile", [authJwt.verifyToken, verifySignUp.checkDuplicateUsername], controller.postUserProfile);

  app.get("/user", [authJwt.verifyToken], controller.getUser);

  app.post("/user/password", [authJwt.verifyToken], controller.changepassword);

  app.post("/user/role", [authJwt.verifyToken], controller.changerole);

};

