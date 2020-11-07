var express = require("express");
const router = express.Router();
const Customer = require('../../../models/customer');
const Restaurant = require('../../../models/restaurant');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const kafka = require("../../../kafka/client");


router.post("/",(req, res)=> {
    //let hash = bcrypt.hashSync(req.body.password, salt);


    if(req.body.userType  === "customer"){

        let body =  {
            userType :req.body.userType,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }   
        console.log("Customer signup called");

        kafka.make_request('signup', body , function (err,result){
            console.log("In customer signup result");
            if(err){
                console.log("error",err)
                res.send({ success: false})               
            }
            else{
                console.log("result", result);
                if(result.success){
                     res.send({success:true, message: ""});
                }

                else {
                    console.log("Customer already exists");
                    res.status(401).send({ success: false, message:"Account with this mail already exixts"});
        }                
            }
        });

        // Customer.findOne({ email: req.body.email })
        // .then(customer => {
        //     if (customer) {
        //         console.log("Customer Found", customer);
        //         res.status(400).send({message: "Account with this mail already exixts"});
        //     }
        //     else{
        //         var newCustomer = new Customer({
        //             name: req.body.name,
        //             password: hash,
        //             email: req.body.email,       
        //         });
        //         newCustomer.save((err)=>{
        //             if (err) {
        //                 // callback(null, { success: false });
        //                 res.status(400).send({ success: false,  message: "" });
        //               } else {
        //                 // callback(null, { success: true });
        //                 res.status(200).send({ success: true , message: ""});
        //               }
        //         });
        //     }
        // })
    }       
    else if(req.body.userType  === "restaurant"){
        console.log("Restaurant signup called")
        let body =  {
            userType :req.body.userType,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,    
        }

        kafka.make_request('signup', body , function (err,result){
            console.log("In restaurant signup result");
            if(err){
                console.log("error",err)
                res.send({ success: false})               
            }
            else{
                console.log("result", result);
                if(result.success){
                     res.send({success:true, message: ""});
                }

                else {
                    console.log("Restaurant already exists");
                    res.status(401).send({ success: false, message:"Account with this mail already exixts"});
        }                
            }
        });


        // Restaurant.findOne({ email: req.body.email })
        // .then(restaurant => {
        //     if (restaurant) {
        //         console.log("Restaurant Found", restaurant);
        //         res.status(400).send({message: "Account with this mail already exixts"});
        //     }
        //     else{
        //         var newRestaurant = new Restaurant({
        //             name: req.body.name,
        //             password: hash,
        //             email: req.body.email,
        //             location: req.body.location,       
        //         });
        //         newRestaurant.save((err)=>{
        //             if (err) {
        //                 // callback(null, { success: false });
        //                 res.status(400).send({ success: false });
        //               } else {
        //                 // callback(null, { success: true });
        //                 res.status(200).send({ success: true });
        //               }
        //         });
        //     }
        // })
    }
});
module.exports = router;