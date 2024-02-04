const { authJwt } = require("../middleware");
const { body, check } = require("express-validator");
const controller = require("../controllers/category.record.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/category", [
    authJwt.verifyToken,
  ], controller.getCategoryRecords);
  app.post("/category", [
    authJwt.verifyToken,
    body("categoryType").notEmpty().withMessage("CategoryType shouldn't empty").isIn(["debit", "credit"]).withMessage("CategoryType invalid"),
    body("category").notEmpty().withMessage("Source shouldn't empty").isString().withMessage("Category invalid"),
  ], controller.postCategoryRecord);
  app.post("/category/:ID", [
    authJwt.verifyToken,
    check("id").isInt().withMessage("ID must be an integer"),
    body("categoryType").optional().isIn(["debit", "credit"]).withMessage("CategoryType invalid"),
    body("category").optional().isString().withMessage("Category invalid"),
  ], controller.updateCategoryRecord);
  app.delete("/category/:ID", [
    authJwt.verifyToken,
    check("id").isInt().withMessage("ID must be an integer"),
  ], controller.deleteCategoryRecord);

};
