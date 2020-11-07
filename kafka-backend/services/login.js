const Customer = require('../models/customer');
const Restaurant = require("../models/restaurant");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken')
const {secret} = require("../Utils/config");
// exports.serve = function serve(msg, callback) {
//     // console.log('inside kafka backend login service');
//     console.log("msg", msg);
//     // console.log("In Service path:", msg.path);
//     switch (msg.path) {
//         case "customer_login":
//             customer_login(msg, callback);
//             break;
//         case "restaurant_login":
//             restaurant_login(msg, callback);
//             break;
//     }
// }

function handle_request(msg, callback) {
    // console.log('student email- ', msg.body.email);
    // console.log('student password- ', msg.body.password);
    console.log("msg body", msg);
    console.log("Password", msg.userType)
    let password = msg.password;
    if(msg.userType == "customer"){
        console.log("Inside customer");
        Customer.findOne({ email: msg.email })
        .then(customer => {
            if (customer) {
                console.log("customer found-", customer)
                if (bcrypt.compareSync(password, customer.password)) {
                    console.log('customer password match')
                    var payload = {
                           
                        user: "customer",
                        CID: customer._id,
                        Cname: customer.name,
                        Cemail: customer.email
                     }
                     var token = jwt.sign(payload, secret, {
                         expiresIn: 1008000 // in seconds
                     });
                     console.log("Token customer: ", token);
                     //res.end(JSON.stringify({success: true, token: "JWT " + token }))
                     callback(null, { success: true, token: "JWT " + token })
                     //callback(null, { success: true, CID: customer._id, Cname: customer.name, Cemail: customer.email })
                }
                else {
                    console.log('wrong password')
                    callback(null, { success: false })
                }
            }
        })
        .catch(error => {
            console.log('customer login error', error)
        })
    }
    else{
        console.log("Restaurant login called");
        Restaurant.findOne({ email: msg.email })
        .then(restaurant => {
            if (restaurant) {
                console.log("Restaurant Found", restaurant);
                    if (bcrypt.compareSync(password, restaurant.password)) {
                        console.log("Restaurant Password Match");

                        var payload = {
                           
                            user: "restaurant",
                            RID: restaurant._id,
                            Rname: restaurant.name,
                            Remail: restaurant.email
                         }
                         var token = jwt.sign(payload, secret, {
                             expiresIn: 1008000 // in seconds
                         });
                         console.log("Token restaurant: ", token);
                        //  res.end(JSON.stringify({success: true, token: "JWT " + token }))
                        callback(null, { success: true, token: "JWT " + token })
                         //res.status(200).send({ success: true, res: restaurant});
                      } else {
                        console.log("Password did not Match");
                        callback(null, { success: false });
                        // res.status(401).send({ success: false});
            }                
        }
        })
    }
   
}

exports.handle_request = handle_request;
