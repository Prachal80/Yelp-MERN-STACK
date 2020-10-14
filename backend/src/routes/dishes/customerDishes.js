var express = require("express");
var app = express();
const router = express.Router();

var executeQuery = require("../../database/mysql");

//Get All Dishes from dish table
router.get("/getAllDishes", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from dishes";
  let args = [];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Dishes not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, customerDishGet: result });
    }
  });
});

//Get all Restaurants

router.get("/getAllRestaurants", (req, res) => {
  console.log("req data ", req.query);
  let query =
    "select restaurant.id, restaurant.name, restaurant.email, restaurant.location, restaurant.description, restaurant.contact, restaurant.restaurantprofilepic, restaurant.country, restaurant.state, restaurant.ratings,restaurant.address,restaurant.method, restaurant.cuisine, group_concat(dishes.dishname) as dishes from restaurant inner join dishes on restaurant.id = dishes.restaurantid group by restaurant.id";
  let args = [];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------Restaurants not found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, allRestaurants: result });
    }
  });
});

module.exports = router;
