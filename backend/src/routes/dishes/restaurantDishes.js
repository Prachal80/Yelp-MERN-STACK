var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Restaurant = require('../../../models/restaurant');
const mongoose = require('mongoose');
const { EROFS } = require("constants");
//const { checkCustomerAuth } = require("../../../Utils/passport");
const { checkRestaurantAuth , auth} = require("../../../Utils/passport");
const kafka = require("../../../kafka/client");
auth();

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
  "/addRestaurantDishes", checkRestaurantAuth,
  upload.single("restaurantDishImage"),
  function (req, res) {
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);
    let body = {
      dishname:req.body.dishname,
      ingredients:req.body.ingredients,
      image:imagepath,
      price: req.body.price,
      description: req.body.description,
      category:req.body.category,
      restaurantname: req.body.Rname,
      restaurantid: req.body.RID,   
    }
    console.log("Inside Restaurant Add Dish",body);
    
    kafka.make_request('restaurant_post_dish', body , function (err,result){

      console.log("Add dish result", result);
      if(result.success){
        // console.log(result)
        res.status(200).send({success: true, dish:result.dish});
      }
      else{
        console.log('Error while adding dish')
        res.status(401).end("Error while adding dish")
      }
      
    })
    
  }
);



//Update Dishes
router.post(
  "/updateRestaurantDishes", checkRestaurantAuth,
  upload.single("restaurantDishImage"),
  function (req, res) {
    console.log("Inside update Restaurant update Dish");
    console.log("%%%%%%%", req.body);
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);

    Restaurant.findOneAndUpdate({dishes: {$elemMatch: {_id: req.body.id}}},
        {$set:
            { 
                "dishes.$":{
                dishname:req.body.dishname,
                ingredients:req.body.ingredients,
                image:imagepath,
                price: req.body.price,
                description: req.body.description,
                category:req.body.category,   

                }        
    }
        
    },{new:true}).then(dish => {
        if(dish){
            console.log('Dish Updated: ', dish);
                // res.redirect(
                //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
                res.status(200).send({success: true, dish:dish.dishes});
        }
        else {
            console.log('wrong dish details')
            res.status(401).end("wrong dish details")
        }
    }).catch(error => {console.log('update dish error', error)
})
 }
);

//Get All Dishes
router.get("/getAllDishes",checkRestaurantAuth ,(req, res) => {
  console.log("Get all dishes data ", req.query);

  Restaurant.findById(req.query.RID)
  .then(restaurant=>{
      if (restaurant) {
          console.log("dishes Found", restaurant.dishes);
          res.status(200).send({success: true, restaurantDishGet : restaurant.dishes});
        //   res.redirect(
        //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
      }
      else{
          res.status(401).send({success: false, restaurantDishGet: restaurant.dishes});
        //   res.redirect(
        //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
      }
      
  })

});

module.exports = router;
