const { authJwt } = require("../middleware");
const { body, param, query, check } = require("express-validator");
const controller = require("../controllers/source.record.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/sources", [
    authJwt.verifyToken,
  ], controller.getSourceRecords);
  app.post("/sources", [
    authJwt.verifyToken,
    body("sourceType").notEmpty().withMessage("SourceType shouldn't empty").isIn(["bankAccount", "eWallet", "wallet", "other"]).withMessage("SourceType invalid"),
    body("source").notEmpty().withMessage("Source shouldn't empty").isString().withMessage("Source invalid"),
  ], controller.postSourceRecord);
  app.post("/sources/:ID", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
    body("sourceType").optional().isIn(["bankAccount", "eWallet", "wallet", "other"]).withMessage("SourceType invalid"),
    body("source").optional().isString().withMessage("Source invalid"),
  ], controller.updateSourceRecord);
  app.delete("/sources/:ID", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
  ], controller.deleteSourceRecord);

};
