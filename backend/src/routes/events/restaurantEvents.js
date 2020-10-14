var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

//Add Events
router.post(
  "/addRestaurantEvents",

  function (req, res) {
    console.log("Inside add Restaurant Event");
    console.log("%%%%%%%", req.body);
    let query = `insert into Events (eventname, eventdescription,eventtime,eventdate,eventlocation,hashtags,restaurantname,restaurantid) values (
      ?,?,?,?,?,?,?,?)`;

    let args = [
      req.body.eventname,
      req.body.eventdescription,
      req.body.eventtime,
      req.body.eventdate,
      req.body.eventlocation,
      req.body.hashtags,
      req.body.restaurantname,
      req.body.restaurantid,
    ];
    console.log("**********", query);
    console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        res.send({ success: true, restaurantEventAdd: result });
      }
    });
  }
);

//Get All Events
router.get("/getAllEvents", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from Events where restaurantid = ?";
  let args = [req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Events not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, restaurantEventsGet: result });
    }
  });
});

//Get Registered Customers
router.get("/getRegisteredCustomers", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from registrations where restaurantid = ?";
  let args = [req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Customer Registrations not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, getRegisteredCustomers: result });
    }
  });
});

module.exports = router;
