const express = require("express");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const corsOptions = require('./app/config/cors.config');
const limiterOptions = require('./app/config/limiter.config');
const db = require("./app/models");

const app = express();

global.__basedir = __dirname;

// implement cors
app.use(cors(corsOptions));

// implement limit request
app.use(rateLimit(limiterOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "This is Aplikasi Pencatatan Keuangan backend interface" });
});

// routes
require("./app/routes/auth.route")(app);
require("./app/routes/user.route")(app);
require("./app/routes/record.route")(app);
require("./app/routes/category.record.route")(app);
require("./app/routes/photo.record.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

