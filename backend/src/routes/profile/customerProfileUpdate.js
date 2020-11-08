var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Customer = require('../../../models/customer');
const { checkCustomerAuth, auth } = require("../../../Utils/passport");
//const { checkRestaurantAuth , auth} = require("../../../Utils/passport");
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

  router.post("/updateCustomerProfilePic",checkCustomerAuth, upload.single("profilePic"), function (
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
router.get("/getCustomerProfile",(req, res) => {
    console.log("req data for get customer ", req.query);
    let body = {
      CID : req.query.CID
    }

    kafka.make_request('get_customer_profile', body , function (err,result){
      console.log("get customer profile", result);
      if(result.success){
        // console.log(result)
        res.status(200).send({success: true, profileData:result.profileData});
      }
      else{
        console.log('Error while getting customer profile');
        res.status(400).send({success:false, profileData:result.profileData});
      }
    
    })
    
  });


router.post("/updateCustomerProfile", checkCustomerAuth,(req, res) => {
    console.log("update profile req data ", req.body);

    let body = { 
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
            CID: req.body.CID,
    }
    kafka.make_request('update_customer_profile', body , function (err,result){
        console.log("get customer profile", result);
        if(result.success){
          // console.log(result)
          res.status(200).send({success: true, profileData:result.profileData});
        }
        else{
          console.log('Error while getting customer profile');
          res.status(400).send({success:false, profileData:result.profileData});
        }
      
      })

    // Customer.findByIdAndUpdate({_id:req.body.CID}, 
    //     {
    //         name : req.body.name,
    //         birthdate : req.body.dob,
    //         email: req.body.emailid,
    //         city: req.body.city,
    //         state: req.body.state,
    //         country: req.body.country,
    //         nickname: req.body.nickname,
    //         headline: req.body.headline,
    //         phone: req.body.phone,
    //         blog: req.body.blog,
    //         yelpingSince: req.body.yelpingSince,
    //         findMeIn: req.body.findMeIn,
    //         thingsIlove: req.body.thingsIlove,
            
    //     }, {new:true})
    //     .then(customer => {
    //         if (customer) {
    //             console.log('All the details Customer: ', customer);
    //             res.status(200).send({success: true, profileData: customer});
    //             // res.redirect(
    //             //     "http://" + process.env.ip + ":3000" + "/customer/profile");
    //         }
    //         else {
    //             console.log('wrong customer id')
    //             res.status(401).end("wrong customer id")
    //         }
    //     })
    //     .catch(error => {
    //         console.log('update customer profile error', error)
    //     })
  
  }); 


//Get All Customers 
router.get("/getAllUsers", checkCustomerAuth,(req, res) => {
  console.log("req data for get users ", req.query.Cemail);

  Customer.find( {email: {$ne: req.query.Cemail } } )
  .then(users=>{
      if (users) {
          console.log("Customer Found", users);
          res.status(200).send({success: true, users: users});
      }
      else{
          res.status(401).send({success: false, users: users});
      }
      
  })
  
});

//Follow Customer
router.post("/follow",checkCustomerAuth, (req,res) => {

  console.log("Follow request for the customer ", req.body);
  var followers = null;
  var following = null;
  Customer.findByIdAndUpdate(req.body.Follow_CID, {
    $push: {
      followers:{
        follower_id: req.body.CID,
      }
    }
  },{ new : true})
  .then(result => {
    if(result){
      followers = result.followers;
      console.log("Result of Following:  " , followers);
      //console.log("Result of Following:  " , result.followers);


      Customer.findByIdAndUpdate(req.body.CID, { 
        $push: {
          following:{
            following_id: req.body.Follow_CID,
          }
        }
      }, {new:true}).then(follower =>{
        if(follower){
          following = follower.following;
          //console.log("Result of Follower:  " , follower.following);
          console.log("Result of Follower:  " , following);
    
          res.status(200).send({success:true, followers:followers, following:following });
    
        }
      }) 
    }
  })
  .catch(err=> {
    res.status(400).send({success:false, followers:followers, following:following });
  })
 
})

//UnFollow Customer
router.post("/unfollow", checkCustomerAuth,(req,res) => {

  console.log("UnFollow request for the customer ", req.body);
  var followers = null;
  var following = null;
  Customer.findByIdAndUpdate(req.body.Follow_CID, {
    $pull: { 
      followers: 
      {
        //$elemMatch:{
          follower_id: req.body.CID
        //}
      }
     
    }
  },{ new : true})
  .then(result => {
    if(result){
      followers = result.followers;
      console.log("Result of Following:  " , followers);
      //console.log("Result of Following:  " , result.followers);


      Customer.findByIdAndUpdate(req.body.CID, { 
        $pull: { 
          following: 
            {
              //$elemMatch :  {
            following_id: req.body.Follow_CID
         // }
        }
          
        }
      }, {new:true}).then(follower =>{
        if(follower){
          following = follower.following;
          //console.log("Result of Follower:  " , follower.following);
          console.log("Result of Follower:  " , following);
    
          res.status(200).send({success:true, followers:followers, following:following });
    
        }
      }) 
    }
  })
  .catch(err=> {
    res.status(400).send({success:false, followers:followers, following:following });
  })
 
})


module.exports = router;