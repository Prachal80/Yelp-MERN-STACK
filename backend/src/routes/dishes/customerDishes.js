var express = require("express");
var app = express();
const router = express.Router();
const Restaurant = require('../../../models/restaurant');
const { checkCustomerAuth, auth } = require("../../../Utils/passport");
//const { checkRestaurantAuth , auth} = require("../../../Utils/passport");
auth();

//Get All Dishes from dish table
router.get("/getAllDishes",checkCustomerAuth, (req, res) => {
  console.log("req data ", req.query);
  
  Restaurant.find({},{dishes:1,_id:0})
  .then(restaurant => {
      if(restaurant){
          console.log("Get all Dishes customer: ", restaurant[0])
          res.status(200).send({success: true, customerDishGet: restaurant[0]});
      }
      else{
        res.status(401).send({success:false, customerDishGet: restaurant[0]});
      }
  })
  .catch(error => {
      console.log(error);
  })
});

//Get All Restaurants
router.get("/getAllRestaurants",checkCustomerAuth ,(req, res) => {
    //console.log("Get all restaurants data ", req.query);
  
    Restaurant.find({})
    .then(restaurants=>{
        if (restaurants) {
            console.log("Restaurant Found", restaurants);
            res.status(200).send({success: true, allRestaurants : restaurants});
          //   res.redirect(
          //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
        }
        else{
            res.status(401).send({success: false, allRestaurants: restaurants});
          //   res.redirect(
          //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
        }
        
    })
  
  });
  

module.exports = router;
