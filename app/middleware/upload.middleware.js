const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error('Only image file allowed'));
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/tmp/");
    },
    // ? TURN ON IF YOU WANT TO SET FILENAME IN MIDDLEWARE SIDE
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}-file.tmp`);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;

