const Customer = require('../models/customer');
const Restaurant = require("../models/restaurant");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken')
const {secret} = require("../Utils/config");

function handle_request(msg, callback) {
    // console.log('student email- ', msg.body.email);
    // console.log('student password- ', msg.body.password);

    console.log("msg body", msg);
    console.log("Password", msg.userType)
    //let password = msg.password;
    let hash = bcrypt.hashSync(msg.password, salt);
    if(msg.userType == "customer"){
        console.log("Inside customer");
        Customer.findOne({ email: msg.email })
        .then(customer => {
            if (customer) {
                console.log("Customer Found", customer);
                callback(null,{success:false, message: "Account with this mail already exixts"});
                //res.status(400).send({message: "Account with this mail already exixts"});
            }
            else{
                var newCustomer = new Customer({
                    name: msg.name,
                    password: hash,
                    email: msg.email,       
                });
                newCustomer.save((err)=>{
                    if (err) {
                        callback(err, { success: false, message:"" });
                        //res.status(400).send({ success: false,  message: "" });
                      } else {
                        callback(null, { success: true, message:"" });
                        //res.status(200).send({ success: true , message: ""});
                      }
                });
            }
        })
    }
    else{
        console.log("Restaurant login called");
        console.log("Inside Restaurant");

        Restaurant.findOne({ email: msg.email })
        .then(restaurant => {
            if (restaurant) {
                console.log("Restaurant Found", restaurant);
                callback(null,{success:false, message: "Account with this mail already exixts"});
                //res.status(400).send({message: "Account with this mail already exixts"});
            }
            else{
                var newRestaurant = new Restaurant({
                    name: msg.name,
                    password: hash,
                    email: msg.email,
                    location: msg.location,       
                });
                newRestaurant.save((err)=>{
                    if (err) {
                        callback(err, { success: false , message:""});
                        //res.status(400).send({ success: false });
                      } else {
                        callback(null, { success: true, message:"" });
                        //res.status(200).send({ success: true });
                      }
                });
            }
        })
    }
   
}

exports.handle_request = handle_request;
