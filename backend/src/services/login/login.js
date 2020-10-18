const Customer = require('../../../models/customer');
const Restaurant = require('../../../models/restaurant');
const bcrypt = require('bcrypt');
var express = require("express");
const router = express.Router();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



router.post("/",(req,res)=>{
    console.log("Inside Login");

    let hash = bcrypt.hashSync(req.body.password, salt);

    if(req.body.userType  === "customer"){
        console.log("Customer Login called", req.body)
        Customer.findOne({ email: req.body.username })
        .then(customer => {
            if (customer) {
                console.log("Customer Found", customer);
                    if (bcrypt.compareSync(req.body.password, customer.password)) {
                        console.log("Password Match");
                        res.status(200).send({ success: true, res : customer});
                      } else {
                        console.log("Password did not Match");
                        res.status(401).send({ success: false});
            }                
        }
        })
    }
    else if(req.body.userType  === "restaurant"){
        console.log("Restaurant Login called")
        Restaurant.findOne({ email: req.body.username })
        .then(restaurant => {
            if (restaurant) {
                console.log("Restaurant Found", restaurant);
                    if (bcrypt.compareSync(req.body.password, restaurant.password)) {
                        console.log("Password Match");
                        res.status(200).send({ success: true, res: restaurant});
                      } else {
                        console.log("Password did not Match");
                        res.status(401).send({ success: false});
            }                
        }
        })
    }  
})


module.exports = router;