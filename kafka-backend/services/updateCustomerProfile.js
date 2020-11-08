const Customer = require('../models/customer');


function handle_request(msg, callback) {

    console.log("message body", msg);


Customer.findByIdAndUpdate({_id:msg.CID}, 
    {
        name : msg.name,
        birthdate : msg.birthdate,
        email: msg.email,
        city: msg.city,
        state: msg.state,
        country: msg.country,
        nickname: msg.nickname,
        headline: msg.headline,
        phone: msg.phone,
        blog: msg.blog,
        yelpingSince: msg.yelpingSince,
        findMeIn: msg.findMeIn,
        thingsIlove: msg.thingsIlove,
        
    }, {new:true})
    .then(customer => {
        if (customer) {
            console.log('All the details Customer: ', customer);
            callback(null,{success: true, profileData: customer})
            //res.status(200).send({success: true, profileData: customer});
            // res.redirect(
            //     "http://" + process.env.ip + ":3000" + "/customer/profile");
        }
        else {
            console.log('wrong customer id')
            callback(null,{success: false, profileData: customer})
            //res.status(401).end("wrong customer id")
        }
    })
    .catch(error => {
        console.log('update customer profile error', error)
    })

}

exports.handle_request = handle_request;