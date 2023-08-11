const { authJwt } = require("../middleware");
const { body, param, query, check } = require("express-validator");
const controller = require("../controllers/photo.record.controller");
const upload = require("../middleware/upload.middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/photos", [
    authJwt.verifyToken,
  ], controller.getPhotoRecords);
  app.post("/photos", [
    authJwt.verifyToken,
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("startDate").notEmpty().withMessage("StartDate shouldn't empty").isDate().withMessage("StartDate invalid"),
    body("endDate").optional().isDate().withMessage("StartDate invalid"),
    body("tag").optional().isString().withMessage("Detail invalid"),
  ], controller.postPhotoRecord);
  
  app.post("/photos/upload", [
    authJwt.verifyToken,
    (req, res, next) => {
      upload.single("file") (req, res, (err) => {
          if (err) {
              return res.status(400).json({
                status: false,
                message: err.message,
              });
          }
          next()
    })}
  ], controller.uploadImage);

  app.post("/photos/:ID/image", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
    body("path").notEmpty().withMessage("Path shouldn't empty").isString().withMessage("Path invalid"),
  ], controller.setImage);

  app.get("/photos/:ID/image", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
  ], controller.downloadImage);
  
  app.post("/photos/:ID", [
    authJwt.verifyToken,
    check("ID").isInt().withMessage("ID must be an integer"),
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("startDate").optional().isDate().withMessage("StartDate invalid"),
    body("endDate").optional().isDate().withMessage("StartDate invalid"),
    body("tag").optional().isString().withMessage("Detail invalid"),
  ], controller.updatePhotoRecord);
  app.delete("/photos/:ID", [
    authJwt.verifyToken,
  ], controller.deletePhotoRecord);
  
};
