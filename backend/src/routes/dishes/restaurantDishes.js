var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

//Add dishes
router.post(
  "/addRestaurantDishes",
  upload.single("restaurantDishImage"),
  function (req, res) {
    console.log("Inside update Restaurant Upload Dish");
    var host = req.hostname;
    console.log("Hostname", host);
    console.log("Dish Image File", req.file);
    console.log("Dish File Path req.file.path", req.file.path);
    console.log("RID", req.body.RID);
    console.log("Restaurant Name", req.body.Rname);
    console.log("protocol ", req.protocol);
    console.log("%%%%%%%", req.body);
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);
    let query = `insert into dishes (dishname, ingredients,image,price,description,category,restaurantid,restaurantname) values (?,?,?,?,?,?,?,?)`;

    let args = [
      req.body.dishname,
      req.body.ingredients,
      imagepath,
      req.body.price,
      req.body.description,
      req.body.category,
      req.body.RID,
      req.body.Rname,
    ];
    console.log("**********", query);
    console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        // res.redirect("http://"+process.env.ip+":3001"+"/restaurant/dashboard");
        res.send({ success: true, restaurantDishAdd: result });
      }
    });
  }
);

//Update Dishes
router.post(
  "/updateRestaurantDishes",
  upload.single("restaurantDishImage"),
  function (req, res) {
    console.log("Inside update Restaurant Upload Dish");
    var host = req.hostname;
    console.log("Hostname", host);
    console.log("Dish Image File", req.file);
    console.log("Dish File Path req.file.path", req.file.path);
    console.log("RID", req.body.RID);
    console.log("Restaurant Name", req.body.Rname);
    console.log("protocol ", req.protocol);
    console.log("%%%%%%%", req.body);
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);
    let query =
      "update dishes set dishname = ?, ingredients=?,image=?,price=?,description=?,category=? where id = ?";

    let args = [
      req.body.dishname,
      req.body.ingredients,
      imagepath,
      req.body.price,
      req.body.description,
      req.body.category,
      req.body.id,
    ];
    console.log("**********", query);
    console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        // res.redirect("http://"+process.env.ip+":300"+"/restaurant/dashboard");
        res.send({ success: true, restaurantDishUpdate: result });
      }
    });
  }
);

//Get All Dishes
router.get("/getAllDishes", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from dishes where restaurantid = ?";
  let args = [req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Dishes or Restaurant not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, restaurantDishGet: result });
    }
  });
});

//Update Dishes
router.post("/updateDishe", (req, res) => {
  console.log("update profile req data ", req.body);
  console.log("Inside update Restaurant Upload Dish");
  var host = req.hostname;
  console.log("Hostname", host);
  console.log("Dish Image File", req.file);
  console.log("Dish File Path req.file.path", req.file.path);
  console.log("RID", req.body.RID);
  console.log("protocol ", req.protocol);
  console.log("%%%%%%%", req.body);
  var imagepath = req.file.path;
  console.log("imagepath ", imagepath);

  let query =
    "update dishes set dishname = ?, ingredients = ? ,image = ? ,price = ? ,description = ?,category = ? ,restaurantid = ? where restaurantid = ?";
  let args = [
    req.body.dishname,
    req.body.ingredients,
    imagepath,
    req.body.price,
    req.body.description,
    req.body.category,
    req.body.RID,
  ];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("user not found");
    else {
      console.log("result ", result);
      res.send({ success: true, restaurantDishUpdated: result });
    }
  });
});

router.get("/get");

module.exports = router;
