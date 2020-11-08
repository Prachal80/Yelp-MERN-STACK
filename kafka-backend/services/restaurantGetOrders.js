const Orders = require('../models/orders');



function handle_request(msg, callback) {

    console.log("message body", msg);

    Orders.find({restaurantid: msg.restaurantid})
    .then(orders=>{
    if(orders){
      console.log("orders in restaurant", orders);
      callback(null,{success: true, RestaurantGetOrder : orders});
      //res.status(200).send({success: true, RestaurantGetOrder : orders});
    }
    else{
      console.log("order make error", orders);
      callback(null,{success: false, RestaurantGetOrder : orders});
      //res.status(400).send({success: false, RestaurantGetOrder : orders});
    }
})

}

exports.handle_request = handle_request;

