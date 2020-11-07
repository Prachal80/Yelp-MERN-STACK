const Customer = require('../../../models/customer');
const Restaurant = require('../../../models/restaurant');
const {auth} = require("../../../Utils/passport");
const {secret} = require("../../../Utils/config");
const { checkCustomerAuth } = require("../../../Utils/passport");
const { checkRestaurantAuth } = require("../../../Utils/passport");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var express = require("express");
const router = express.Router();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const kafka = require("../../../kafka/client");

auth();


router.post("/",(req,res)=>{
    console.log("Inside Login");

    let hash = bcrypt.hashSync(req.body.password, salt);
    let body =  {
        userType :req.body.userType,
        email: req.body.username,
        password: req.body.password
    }
    console.log("req body login route",body );
    if(req.body.userType  === "customer"){
        
        console.log("Customer Login called", req.body)
 
        kafka.make_request('login', body , function (err,result){
            console.log("In customer Login result");
            if(err){
                console.log("error",err)
                res.send({ success: false})               
            }
            else{
                console.log("result", result);
                if(result.success){
                    // var payload = {
                           
                    //     user: "customer",
                    //     CID: result._id,
                    //     Cname: result.name,
                    //     Cemail: result.email
                    //  }
                    //  var token = jwt.sign(payload, secret, {
                    //      expiresIn: 1008000 // in seconds
                    //  });
                    //  console.log("Token customer: ", token);
                    //  res.end(JSON.stringify({success: true, token: "JWT " + token }))
                     //res.status(200).send({ success: true, res : customer});
                     res.end(JSON.stringify(result));
                }

                else {
                    console.log("Password did not Match");
                    res.status(401).send({ success: false});
        }                
            }
        });
        // Customer.findOne({ email: req.body.username })
        // .then(customer => {
        //     if (customer) {
        //         console.log("Customer Found", customer);
        //             if (bcrypt.compareSync(req.body.password, customer.password)) {
        //                 console.log("Password Match");

        //                 var payload = {
                           
        //                    user: "customer",
        //                    CID: customer._id,
        //                    Cname: customer.name,
        //                    Cemail: customer.email
        //                 }
        //                 var token = jwt.sign(payload, secret, {
        //                     expiresIn: 1008000 // in seconds
        //                 });
        //                 console.log("Token customer: ", token);
        //                 res.end(JSON.stringify({success: true, token: "JWT " + token }))
        //                 //res.status(200).send({ success: true, res : customer});
        //               } 
        //               else {
        //                 console.log("Password did not Match");
        //                 res.status(401).send({ success: false});
        //     }                
        // }
        // })
    }
    else if(req.body.userType  === "restaurant"){
        console.log("Restaurant Login called",req.body)
 
        kafka.make_request('login', body , function (err,result){
            console.log("In Restaurant Login result");
            if(err){
                console.log("error",err)
                res.send({ success: false})               
            }
            else{
                console.log("result", result);
                if(result.success){
                    res.end(JSON.stringify(result));
                }

                else {
                    console.log("Password did not Match");
                    res.status(401).send({ success: false});
                }                
            }
        });
        // Restaurant.findOne({ email: req.body.username })
        // .then(restaurant => {
        //     if (restaurant) {
        //         console.log("Restaurant Found", restaurant);
        //             if (bcrypt.compareSync(req.body.password, restaurant.password)) {
        //                 console.log("Password Match");

        //                 var payload = {
                           
        //                     user: "restaurant",
        //                     RID: restaurant._id,
        //                     Rname: restaurant.name,
        //                     Remail: restaurant.email
        //                  }
        //                  var token = jwt.sign(payload, secret, {
        //                      expiresIn: 1008000 // in seconds
        //                  });
        //                  console.log("Token restaurant: ", token);
        //                  res.end(JSON.stringify({success: true, token: "JWT " + token }))
        //                  //res.status(200).send({ success: true, res: restaurant});
        //               } else {
        //                 console.log("Password did not Match");
        //                 res.status(401).send({ success: false});
        //     }                
        // }
        // })
    }
    })

module.exports = router;