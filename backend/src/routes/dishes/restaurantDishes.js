var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Restaurant = require('../../../models/restaurant');
const mongoose = require('mongoose');
const { EROFS } = require("constants");

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
  "/addRestaurantDishes",
  upload.single("restaurantDishImage"),
  function (req, res) {
    console.log("Inside update Restaurant Upload Dish");
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);

    Restaurant.findByIdAndUpdate({_id:req.body.RID},
        {$push:
            { 
                dishes:{   
                dishname:req.body.dishname,
                ingredients:req.body.ingredients,
                image:imagepath,
                price: req.body.price,
                description: req.body.description,
                category:req.body.category,
                restaurantname: req.body.Rname,
                restaurantid: req.body.RID,   
                }
                }        
    }).then(dish => {
        if(dish){
            console.log('Dish added: ', dish.dishes);
                res.redirect(
                    "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
        }
        else {
            console.log('Error while adding dish')
            res.status(401).end("Error while adding dish")
        }
    }).catch(error => {console.log('Add dish error', error)
})
  }
);



//Update Dishes
router.post(
  "/updateRestaurantDishes",
  upload.single("restaurantDishImage"),
  function (req, res) {
    console.log("Inside update Restaurant update Dish");
    console.log("%%%%%%%", req.body);
    var imagepath = req.file.path;
    console.log("imagepath ", imagepath);

    Restaurant.findByIdAndUpdate({_id:req.body.RID},
        {$set:
            { 
                dishes:{

                dishname:req.body.dishname,
                ingredients:req.body.ingredients,
                image:imagepath,
                price: req.body.price,
                description: req.body.description,
                category:req.body.category,   

                }        
    }
        
    }).then(dish => {
        if(dish){
            console.log('Dish Updated: ', dish);
                // res.redirect(
                //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
                res.status(200).send({success: true});
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
router.get("/getAllDishes", (req, res) => {
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
