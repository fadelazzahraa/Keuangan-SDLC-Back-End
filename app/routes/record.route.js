const { authJwt } = require("../middleware");
const { body, param, query, check } = require("express-validator");
const controller = require("../controllers/record.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/records", [
    authJwt.verifyToken,
    query("actor").optional().isIn(["me", "other"]).withMessage("Actor invalid"),
    query("detail").optional().isString().withMessage("Detail invalid"),
    query("date").optional().isDate().withMessage("Date invalid"),
    query("tag").optional().isString().withMessage("Tag invalid"),
    query("sourceRecordId").optional(),
  ], controller.getRecords);
  app.post("/records", [
    authJwt.verifyToken,
    body("actor").notEmpty().withMessage("Actor shouldn't empty").isIn(["me", "other"]).withMessage("Actor invalid"),
    body("transaction").notEmpty().withMessage("Transaction shouldn't empty").isIn(["debit", "credit"]).withMessage("Transaction invalid"),
    body("value").notEmpty().withMessage("Value shouldn't empty").isDecimal().withMessage("Value invalid"),
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("date").notEmpty().withMessage("Date shouldn't empty").isDate().withMessage("Date invalid"),
    body("tag").optional().isString().withMessage("Tag invalid"),
    body("sourceRecordId").optional(),
    body("photoRecordId").optional(),
  ], controller.postRecord);
  app.get("/records/:ID", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
  ], controller.getRecordByID);
  app.post("/records/:ID", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
    body("actor").optional().isIn(["me", "other"]).withMessage("Actor invalid"),
    body("transaction").optional().isIn(["debit", "credit"]).withMessage("Transaction invalid"),
    body("value").optional().isDecimal().withMessage("Value invalid"),
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("date").optional().isDate().withMessage("Date invalid"),
    body("tag").optional().isString().withMessage("Tag invalid"),
    body("sourceRecordId").optional(),
    body("photoRecordId").optional(),
  ], controller.updateRecord);
  app.delete("/records/:ID", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
  ], controller.deleteRecord);

};
