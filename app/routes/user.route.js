const { authJwt, upload, verifySignUp } = require("../middleware");
const { body, query, check, param } = require("express-validator");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/user/profile", [
    authJwt.verifyToken,
    body("id").optional().isInt().withMessage("ID must be an integer"),
  ], controller.getUserProfile);

  app.post("/user/profile", [
    authJwt.verifyToken,
    verifySignUp.checkDuplicateUsername,
    body("username").optional().isString().withMessage("Username invalid"),
  ], controller.postUserProfile);

  app.get("/user", [authJwt.verifyToken], controller.getUser);

  app.post("/user/password", [
    authJwt.verifyToken,
    body("oldpassword").notEmpty().withMessage("Old Password shouldn't empty").isString().withMessage("Old Password invalid"),
    body("newpassword").notEmpty().withMessage("New Password shouldn't empty").isString().withMessage("New Password invalid"),
  ], controller.changepassword);

  app.post("/user/role", [
    authJwt.verifyToken,
    body("id").notEmpty().withMessage("ID shouldn't empty").withMessage("ID must be an integer"),
  ], controller.changerole);

};

