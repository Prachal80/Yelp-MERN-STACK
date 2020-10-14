//import the require dependencies
var express = require("express");
var cors = require("cors");
var app = express();
var mysql = require("mysql");
var path = require("path");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(saltRounds);
var multer = require("multer");
var dotenv = require("dotenv").config({
  path: "../.env",
});

var bodyParser = require("body-parser");
var session = require("express-session");
// var cookieParser = require("cookie-parser");

//use cors to allow cross origin resource sharing
app.use(
  cors({ origin: "http://" + process.env.ip + ":3000" + "", credentials: true })
);
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// //Allow Access Control
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://" + process.env.ip + ":3000"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// Establish mysql connection
const db = mysql.createConnection({
  // connectionLimit: 100,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to Mysql");
  }
});

var loginBasePath = require("./src/routes/login/account");
app.use("/login", loginBasePath);

var signUpPath = require("./src/routes/signup/signup");
app.use("/signup", signUpPath);

var cusotmerProfile = require("./src/routes/profile/customerProfileUpdate");
app.use("/customerProfile", cusotmerProfile);

var restaurantProfile = require("./src/routes/profile/restaurantProfileUpdate");
app.use("/restaurantProfile", restaurantProfile);

var restaurantDishes = require("./src/routes/dishes/restaurantDishes");
app.use("/restaurantDishes", restaurantDishes);

var customerDishes = require("./src/routes/dishes/customerDishes");
app.use("/customerDishes", customerDishes);

var restaurantOrders = require("./src/routes/orders/restaurantOrders");
app.use("/restaurantOrders", restaurantOrders);

var customerOrders = require("./src/routes/orders/customerOrders");
app.use("/customerOrders", customerOrders);

var reviews = require("./src/routes/reviews/reviews");
app.use("/reviews", reviews);

var customerEvents = require("./src/routes/events/customerEvents");
app.use("/customerEvents", customerEvents);

var restaurantEvents = require("./src/routes/events/restaurantEvents");
app.use("/restaurantEvents", restaurantEvents);

exports.db = db;
app.listen(3001);
console.log("Server Listening on port 3001");

console.log(process.env.ip);
