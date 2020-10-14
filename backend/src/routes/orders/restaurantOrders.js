var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

//Get All orders
router.get("/getAllOrdersRestaurant", (req, res) => {
  console.log("req data ", req.query);
  let query = "select * from orders where restaurantid = ? order by time desc";
  let args = [req.query.RID];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------No orders found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, RestaurantGetOrder: result });
    }
  });
});

//Change Order status
router.post("/changeOrderStatusRestaurant", (req, res) => {
  console.log("Inside change status Order Restaurant");
  console.log("Req Body : ", req.body);

  var orderid = req.body.orderid;
  var status = req.body.status;

  if (
    status === "Order Received" ||
    status === "Preparing" ||
    status === "Delivered" ||
    status === "On the way" ||
    status === "Ready for Pickup" ||
    status === "Picked up"
  ) {
    var query = "update orders set status= ? where orderid=?";
    var args = [status, orderid];
    console.log(query, "%%%%%%%%%%%", args);
  }

  executeQuery(query, args, (flag, result) => {
    if (!flag) {
      console.log("-------No orders found-------");
      res.status(404).send({ success: false, RestaurantUpdateOrder: null });
    } else {
      console.log("result ", result);
      res.status(200).send({ success: true, RestaurantUpdateOrder: result });
    }
  });
});

module.exports = router;
