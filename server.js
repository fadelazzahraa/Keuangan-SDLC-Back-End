const express = require("express");
const cors = require("cors");

const app = express();

global.__basedir = __dirname;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");

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
require("./app/routes/source.record.route")(app);
require("./app/routes/photo.record.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});