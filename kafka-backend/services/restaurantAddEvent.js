const Events = require('../models/events');

function handle_request(msg, callback) {

    console.log("message body", msg);

    var  newEvent = new Events({
        eventname: msg.eventname,
        eventdescription: msg.eventdescription,
        eventtime: msg.eventtime,
        eventdate: msg.eventdate,
        eventlocation: msg.eventlocation,
        hashtags: msg.hashtags,
        restaurantname: msg.restaurantname,
        restaurantid: msg.restaurantid,
        })
        console.log("new event",newEvent);
        newEvent.save()
        .then(event=>{
            if (event) 
            {
            console.log("Event saved in DB: ", event);
            callback(null,{success: true, event: event});
            //res.status(200).send({ success: true, event: event });
            }      
            else {
                console.log("Event not saved");
                callback(null,{success: false , event:null});
                //res.status(400).send({ success: false , event:null});
                }
        });

}

exports.handle_request = handle_request;
