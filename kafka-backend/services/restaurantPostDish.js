const Restaurant = require("../models/restaurant");

function handle_request(msg, callback) {

    console.log("message body", msg);

    Restaurant.findByIdAndUpdate({_id:msg.restaurantid},
        {$push:
            { 
                dishes:{   
                dishname:msg.dishname,
                ingredients:msg.ingredients,
                image:msg.image,
                price: msg.price,
                description: msg.description,
                category:msg.category,
                restaurantname: msg.restaurantname,
                restaurantid: msg.restaurantid,   
                }
          }        
    },{new:true}).then(dish => {
        if(dish){
            console.log('Dish added: ', dish.dishes);
            callback(null, {success: true, dish:dish.dishes});
            //res.status(200).send({success: true, dish:dish.dishes});
                // res.redirect(
                //     "http://" + process.env.ip + ":3000" + "/restaurant/dashboard");
        }
        else {
            console.log('Error while adding dish')
            callback(null,{success:false, dish:null});
            res.status(401).end("Error while adding dish")
        }
    }).catch(error => {console.log('Add dish error', error)
})
}



exports.handle_request = handle_request;