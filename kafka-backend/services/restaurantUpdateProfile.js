const Restaurant = require("../models/restaurant");

function handle_request(msg, callback) {

    console.log("Message body", msg);

    Restaurant.findByIdAndUpdate({_id:msg.RID}, 
        {
            name : msg.name,
            email: msg.email,
            location: msg.location,
            state: msg.state,
            country: msg.country,
            address: msg.address,
            description: msg.description,
            contact: msg.contact,
            timings: msg.timings,
            ratings: msg.ratings,
            method: msg.method,
            cuisine: msg.cuisine,
            
        },{new:true})
        .then(restaurant => {
            if (restaurant) {
                console.log('All the details of restaurant: ', restaurant);
                callback(null,{success: true, restaurantProfileData: restaurant})
                //res.status(200).send({success: true, restaurantProfileData: restaurant});
                // res.redirect(
                //     "http://" + process.env.ip + ":3000" + "/customer/profile");
            }
            else {
                console.log('wrong restaurant id')
                callback(null,{success:false, restaurantProfileData: restaurant});
                //res.status(401).end("wrong restaurant id")
            }
        })
        .catch(error => {
            console.log('update Restaurant profile error', error)
        })

}


exports.handle_request = handle_request;    