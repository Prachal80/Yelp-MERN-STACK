var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Orders = require("../../../models/orders")

//Get All orders
router.get("/getAllOrdersRestaurant", (req, res) => {
console.log("req data ", req.query);

Orders.find({restaurantid: req.query.RID})
.then(orders=>{
    if(orders){
      console.log("orders in restaurant", orders);
      res.status(200).send({success: true, RestaurantGetOrder : orders});
    }
    else{
      console.log("order make error", orders);
      res.status(400).send({success: false, RestaurantGetOrder : orders});
    }
})

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

    Orders.findByIdAndUpdate({_id:orderid},{
        $set:{
            status:status
        } 
    },{new:true})
    .then(order => {
      if(order){
          console.log('order status Updated: ', order);
              // res.redirect(
              //     "http://" + process.env.ip + ":3000" + "/restaurant/orders");
              res.status(200).send({success: true, order:order});
      }
      else {
          console.log('wrong order details')
          res.status(401).end("wrong order details")
      }
  }).catch(error => {console.log('update order status error', error)
})
   
  }
});

module.exports = router;
