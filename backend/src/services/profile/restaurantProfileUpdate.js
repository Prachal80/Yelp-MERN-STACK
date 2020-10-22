var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Restaurant = require('../../../models/restaurant');


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

router.post("/updateRestaurantProfilePic", upload.single("restaurantprofilePic"), function (
    req,
    res
  ) {
    console.log("Restaurant side Request", req.body);
    console.log("Inside update Restaurant profile picture");
  
    if (req.file != "") {
    //   var host = req.hostname;
    //   console.log("Hostname", host);
    //   console.log("File", req.file);
    //   console.log("req.file.path", req.file.path);
    //   console.log("CID", req.body.CID);
    //   console.log("protocol ", req.protocol);
      var imagepath = req.file.path;
      console.log("imagepath ", imagepath);
      Restaurant.findByIdAndUpdate({_id:req.body.RID}, 
        {
            restaurantProfilePic: imagepath
        })
        .then(restaurant => {
            if (restaurant) {
                console.log('profilePicURL: ', restaurant.restaurantProfilePic);
                res.redirect(
                    "http://" + process.env.ip + ":3000" + "/restaurant/profile");
            }
            else {
                console.log('wrong restaurant id')
                res.status(401).end("wrong restaurant id")
            }
        })
        .catch(error => {
            console.log('update restaurant profile picture error', error)
        })
      }
    }
  );



//Get Restaurant Profile
router.get("/getRestaurantProfile", (req, res) => {
    console.log("req data for get restaurant ", req.query);

    Restaurant.findById(req.query.RID)
    .then(restaurant=>{
        if (restaurant) {
            console.log("Restaurant Found", restaurant);
            res.status(200).send({success: true, restaurantProfileData: restaurant});
        }
        else{
            res.status(401).send({success: false, restaurantProfileData: restaurant});
        }
        
    })
    
  });

router.post("/updateRestaurantProfile", (req, res) => {
    console.log("update profile req data ", req.body);

    Restaurant.findByIdAndUpdate({_id:req.body.RID}, 
        {
            name : req.body.name,
            email: req.body.email,
            location: req.body.location,
            state: req.body.state,
            country: req.body.country,
            address: req.body.address,
            description: req.body.description,
            contact: req.body.contact,
            timings: req.body.timings,
            ratings: req.body.ratings,
            method: req.body.method,
            cuisine: req.body.cuisine,
            
        })
        .then(restaurant => {
            if (restaurant) {
                console.log('All the details of restaurant: ', restaurant);
                // res.redirect(
                //     "http://" + process.env.ip + ":3000" + "/customer/profile");
            }
            else {
                console.log('wrong restaurant id')
                res.status(401).end("wrong restaurant id")
            }
        })
        .catch(error => {
            console.log('update customer profile error', error)
        })
  
  }); 
  module.exports = router;


module.exports = router;
