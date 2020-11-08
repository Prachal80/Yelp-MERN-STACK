const Restaurant = require("../models/restaurant");

function handle_request(msg, callback) {

    console.log("message body", msg);

    Restaurant.find({})
    .then(restaurants=>{
        if (restaurants) {
            console.log("Restaurant Found", restaurants);
            callback(null,{success: true, allRestaurants : restaurants});
            //res.status(200).send({success: true, allRestaurants : restaurants});
        //   res.redirect(
        //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
        }
        else{
            callback(null,{success: false, allRestaurants : restaurants});
            //res.status(401).send({success: false, allRestaurants: restaurants});
        //   res.redirect(
        //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
        }
    
})
}

exports.handle_request = handle_request;