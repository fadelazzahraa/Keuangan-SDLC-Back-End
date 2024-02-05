const { authJwt } = require("../middleware");
const { body, param, query } = require("express-validator");
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
    body("date").notEmpty().withMessage("Date shouldn't empty").isDate().withMessage("Date invalid"),
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

  app.post("/photos/:id/image", [
    authJwt.verifyToken,
    param("id").isInt().withMessage("ID must be an integer"),
    body("path").notEmpty().withMessage("Path shouldn't empty").isString().withMessage("Path invalid"),
  ], controller.setImage);

  app.get("/photos/:id/image", [
    authJwt.verifyToken,
    param("id").isInt().withMessage("ID must be an integer"),
  ], controller.downloadImage);
  
  app.post("/photos/:id", [
    authJwt.verifyToken,
    param("id").isInt().withMessage("ID must be an integer"),
    body("detail").optional().isString().withMessage("Detail invalid"),
    body("date").optional().isDate().withMessage("Date invalid"),
    body("tag").optional().isString().withMessage("Detail invalid"),
  ], controller.updatePhotoRecord);
  app.delete("/photos/:id", [
    authJwt.verifyToken,
  ], controller.deletePhotoRecord);
  
};
