const { verifySignUp, authJwt } = require("../middleware");
const { body } = require("express-validator");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/auth/signup", [
    verifySignUp.checkDuplicateUsername,
    body("username").notEmpty().withMessage("Username shouldn't empty"),
    body("password").notEmpty().withMessage("Password shouldn't empty"),
    body("adminPass").optional(),
  ], controller.signup);

  app.post("/auth/signin", [
    body("username").notEmpty().withMessage("Username shouldn't empty"),
    body("password").notEmpty().withMessage("Password shouldn't empty"),
  ],
  controller.login);

  app.post("/auth/signout", [
    authJwt.verifyToken,
  ],
  controller.logout);

  app.post("/auth/refresh",
    controller.refreshRefreshToken);

  app.get("/auth/refresh", 
    controller.getAccessToken);

};
