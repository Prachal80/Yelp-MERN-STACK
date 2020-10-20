var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Customer = require('../../../models/customer');

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

  router.post("/updateCustomerProfilePic", upload.single("profilePic"), function (
    req,
    res
  ) {
    console.log("Request", req.body);
    console.log("Inside update profile picture");
  
    if (req.file != "") {
    //   var host = req.hostname;
    //   console.log("Hostname", host);
    //   console.log("File", req.file);
    //   console.log("req.file.path", req.file.path);
    //   console.log("CID", req.body.CID);
    //   console.log("protocol ", req.protocol);
      var imagepath = req.file.path;
      console.log("imagepath ", imagepath);
      Customer.findByIdAndUpdate({_id:req.body.CID}, 
        {
            profilePic: imagepath
        })
        .then(customer => {
            if (customer) {
                console.log('profilePicURL: ', customer.profilePic);
                res.redirect(
                    "http://" + process.env.ip + ":3000" + "/customer/profile");
            }
            else {
                console.log('wrong customer id')
                res.status(401).end("wrong customer id")
            }
        })
        .catch(error => {
            console.log('update customer profile picture error', error)
        })
      }
    }
  );


//Get Customer Profile
router.get("/getCustomerProfile", (req, res) => {
    console.log("req data for get customer ", req.query);

    Customer.findById(req.query.CID)
    .then(customer=>{
        if (customer) {
            console.log("Customer Found", customer);
            res.status(200).send({success: true, profileData: customer});
        }
        else{
            res.status(401).send({success: false, profileData: customer});
        }
        
    })
    
  });


router.post("/updateCustomerProfile", (req, res) => {
    console.log("update profile req data ", req.body);

    Customer.findByIdAndUpdate({_id:req.body.CID}, 
        {
            name : req.body.name,
            birthdate : req.body.dob,
            email: req.body.emailid,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            nickname: req.body.nickname,
            headline: req.body.headline,
            phone: req.body.phone,
            blog: req.body.blog,
            yelpingSince: req.body.yelpingSince,
            findMeIn: req.body.findMeIn,
            thingsIlove: req.body.thingsIlove,
            
        })
        .then(customer => {
            if (customer) {
                console.log('All the details Customer: ', customer);
                // res.redirect(
                //     "http://" + process.env.ip + ":3000" + "/customer/profile");
            }
            else {
                console.log('wrong customer id')
                res.status(401).end("wrong customer id")
            }
        })
        .catch(error => {
            console.log('update customer profile error', error)
        })
  
  }); 
  module.exports = router;