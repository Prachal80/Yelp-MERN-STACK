var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Orders = require("../../../models/orders")
const mongoose = require('mongoose');


//Add orders
router.post(
  "/makeOrderCustomer",
(req, res)=>{
    console.log("Inside Order Customer side");

    console.log("CID", req.body.customerid);
    console.log("RID", req.body.restaurantid);
    //console.log("%%%%%%%", req.body);
    console.log(typeof(req.body.time))
    
    var newOrder = new Orders({
        dishname: req.body.dishname,
        dishimage: req.body.dishimage,
        option: req.body.option,
        price: req.body.price,
        category: req.body.category,
        customerid: req.body.customerid,
        customername: req.body.customername,
        restaurantid: req.body.restaurantid,
        restaurantname: req.body.restaurantname,
        status: req.body.status,
        time: req.body.time,
    });
    console.log("new order",newOrder)
    newOrder.save((err)=>{
        if (err) {
            console.log("in if")
            res.status(400).send({ success: false,  message: "" });
          } else {
            console.log("in else")
            res.status(200).send({ success: true , message: ""});
          }
    });
  }
);

//Get All orders
router.get("/getAllOrders", (req, res) => {
  console.log("req data ", req.query);

  Orders.find({customerid: req.query.CID, 
    status:{
        $ne:"Cancelled",
    }
  })
  .then(orders=>{
      if(orders){
        console.log("order made", orders);
        res.status(200).send({success: true, CustomerGetOrder : orders});
      }
      else{
        console.log("order make error", orders);
        res.status(400).send({success: false, CustomerGetOrder : orders});
      }
  })
});

//Cancel Order Customer
router.post("/deleteOrderCustomer", (req, res) => {
  console.log("Inside delete Order Request");
  console.log("Req Body : ", req.body);

  Orders.findByIdAndUpdate({_id:req.body.orderid},
    {
        $set:{
            status:"CSancelled",
    }      
}).then(order=>{
    console.log("order made", order);
        res.status(200).send({success: true});
})
});

module.exports = router;
