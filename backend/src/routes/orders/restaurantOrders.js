var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Orders = require("../../../models/orders")
//const { checkCustomerAuth } = require("../../../Utils/passport");
const { checkRestaurantAuth , auth} = require("../../../Utils/passport");
const kafka = require("../../../kafka/client");
auth();

//Get All orders
router.get("/getAllOrdersRestaurant",checkRestaurantAuth, (req, res) => {
console.log("req data ", req.query);

var body = {
  restaurantid: req.query.RID
}
kafka.make_request('restaurant_get_orders', body , function (err,result){

console.log("Get Orders restaurant", result);
  if(result.success){
    // console.log(result)
    res.status(200).send({success: true, RestaurantGetOrder:result.RestaurantGetOrder});
  }
  else{
    console.log('Error while getting orders');
    res.status(400).send({success:false, RestaurantGetOrder:result.RestaurantGetOrder});
  }

});

});

//Change Order status
router.post("/changeOrderStatusRestaurant", checkRestaurantAuth,(req, res) => {
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
