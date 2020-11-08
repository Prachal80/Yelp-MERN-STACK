const Restaurant = require("../models/restaurant");

function handle_request(msg, callback) {

    console.log("message body", msg);

    Restaurant.findById(req.query.RID)
    .then(restaurant=>{
    if (restaurant) {
        console.log("Restaurant Found", restaurant);
        callback(null,{success: true, restaurantProfileData: restaurant});
        //res.status(200).send({success: true, restaurantProfileData: restaurant});
    }
    else{
        callback(null,{success: false, restaurantProfileData: restaurant});
        //res.status(401).send({success: false, restaurantProfileData: restaurant});
    }

})

}

exports.handle_request = handle_request;

