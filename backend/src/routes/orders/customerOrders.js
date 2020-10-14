var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
var executeQuery = require("../../database/mysql");

//Add orders
router.post(
  "/makeOrderCustomer",

  function (req, res) {
    console.log("Inside Order Customer side");

    console.log("CID", req.body.customerid);
    console.log("RID", req.body.restaurantid);
    console.log("%%%%%%%", req.body);

    let query =
      "insert into orders (optiontype, dishname, dishimage, price, category, customerid,customername, restaurantid,restaurantname, status, time) values (?,?,?,?,?,?,?,?,?,?,?)";

    let args = [
      req.body.option,
      req.body.dishname,
      req.body.dishimage,
      req.body.price,
      req.body.category,
      req.body.customerid,
      req.body.customername,
      req.body.restaurantid.toString(),
      req.body.restaurantname,
      req.body.status,
      req.body.time,
    ];
    // console.log("**********", query);
    // console.log(args);

    executeQuery(query, args, (flag, result) => {
      if (!flag) console.log("err", flag);
      else {
        res.send({ success: true, CustomerMakeOrder: result });
        // res.redirect("http://"+process.env.ip+":300"+"/customer/orders");
      }
    });
  }
);

//Get All orders
router.get("/getAllOrders", (req, res) => {
  console.log("req data ", req.query);
  let query =
    "select * from orders where customerid = ? and status !=? order by time desc";
  let args = [req.query.CID, "Cancelled"];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------No orders found-------");
    else {
      console.log("Orders made by Customer", result);
      res.send({ success: true, CustomerGetOrder: result });
    }
  });
});

//Cancel Order Customer
router.post("/deleteOrderCustomer", (req, res) => {
  console.log("Inside change status Order Request");
  console.log("Req Body : ", req.body);

  let query = `update orders set status= ? where orderid= ?`;
  let args = ["Cancelled", req.body.orderid];

  executeQuery(query, args, (flag, result) => {
    if (!flag) console.log("-------No orders found-------");
    else {
      console.log("result ", result);
      res.send({ success: true, CustomerDeleteOrder: result });
    }
  });
});

module.exports = router;
