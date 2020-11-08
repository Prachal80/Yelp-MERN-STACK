const Customer = require('../models/customer');


function handle_request(msg, callback) {

    console.log("message body", msg);

    Customer.findById(msg.CID)
    .then(customer=>{
        if (customer) {
            console.log("Customer Found", customer);
            callback(null,{success: true, profileData: customer});
            //res.status(200).send({success: true, profileData: customer});
        }
        else{
            callback(null,{success: false, profileData: customer});
            //res.status(401).send({success: false, profileData: customer});
        }
        
    })

}

exports.handle_request = handle_request;