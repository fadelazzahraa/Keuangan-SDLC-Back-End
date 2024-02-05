const { authJwt } = require("../middleware");
const { body, query, check, param } = require("express-validator");
const controller = require("../controllers/record.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/records", [
    authJwt.verifyToken,
    query("actorId").optional().isInt().withMessage("Actor ID must be an integer"),
    query("transaction").optional().isIn(["debit", "credit"]).withMessage("Transaction invalid"),
    query("detail").optional().isString().withMessage("Detail invalid"),
    query("date").optional().isDate().withMessage("Date invalid"),
    query("tag").optional().isString().withMessage("Tag invalid"),
    query("categoryRecordId").optional().isInt().withMessage("Photo Record ID must be an integer"),
  ], controller.getRecords);
  app.post("/records", [
    authJwt.verifyToken,
    body("actorId").optional().isInt().withMessage("Actor ID must be an integer"),
    body("transaction").notEmpty().withMessage("Transaction shouldn't empty").isIn(["debit", "credit"]).withMessage("Transaction invalid"),
    body("value").notEmpty().withMessage("Value shouldn't empty").isDecimal().withMessage("Value invalid"),
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("date").notEmpty().withMessage("Date shouldn't empty").isDate().withMessage("Date invalid"),
    body("tag").optional().isString().withMessage("Tag invalid"),
    body("categoryRecordId").optional().isInt().withMessage("Category Record ID must be an integer"),
    body("photoRecordId").optional().isInt().withMessage("Photo Record ID must be an integer"),
  ], controller.postRecord);
  app.get("/records/:id", [
    authJwt.verifyToken,
    param("id").isInt().withMessage("ID must be an integer bos"),
  ], controller.getRecordByID);
  app.post("/records/:id", [
    authJwt.verifyToken,
    param("id").isInt().withMessage("ID must be an integer"),
    body("actorId").optional().isInt().withMessage("Actor ID must be an integer"),
    body("transaction").optional().isIn(["debit", "credit"]).withMessage("Transaction invalid"),
    body("value").optional().isDecimal().withMessage("Value invalid"),
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("date").optional().isDate().withMessage("Date invalid"),
    body("tag").optional().isString().withMessage("Tag invalid"),
    body("categoryRecordId").optional().isInt().withMessage("Category Record ID must be an integer"),
    body("photoRecordId").optional().isInt().withMessage("Photo Record ID must be an integer"),
  ], controller.updateRecord);
  app.delete("/records/:id", [
    authJwt.verifyToken,
    param("id").isInt().withMessage("ID must be an integer"),
  ], controller.deleteRecord);

};
