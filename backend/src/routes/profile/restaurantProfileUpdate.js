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

router.post(
  "/updateRestaurantProfilePic",
  upload.single("restaurantprofilePic"),
  function (req, res) {
    console.log("Inside update Restaurant profile picture");
    var host = req.hostname;
    console.log("Hostname", host);
    console.log("File", req.file);
    console.log("req.file.path", req.file.path);
    console.log("RID", req.body.RID);
    console.log("protocol ", req.protocol);
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);

    let query = "update restaurant set restaurantprofilepic = ? where id = ?";
    let args = [imagepath, req.body.RID];
    console.log("**********", query);
    console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        res.redirect(
          "http://" + process.env.ip + ":3000" + "/restaurant/profile"
        );
      }
    });
  }
);

router.get("/getRestaurantProfile", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from restaurant where id = ?";
  let args = [req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("user not found");
    else {
      console.log("result ", result);
      res.send({ success: true, restaurantProfileData: result });
    }
  });
});

router.post("/updateRestaurantProfile", (req, res) => {
  console.log("update profile req data ", req.body);
  let query =
    "update restaurant set name = ? , location = ? , address = ? , state = ? , country = ?, description = ? , timings = ? , email = ? , contact = ? , method = ?, cuisine = ? where id = ?";
  let args = [
    req.body.name,
    req.body.location,
    req.body.address,
    req.body.state,
    req.body.country,
    req.body.description,
    req.body.timings,
    req.body.email,
    req.body.contact,
    req.body.method,
    req.body.cuisine,
    req.body.RID,
  ];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("user not found");
    else {
      console.log("result ", result);
      res.send({ success: true, restaurantProfileData: result });
    }
  });
});

module.exports = router;
