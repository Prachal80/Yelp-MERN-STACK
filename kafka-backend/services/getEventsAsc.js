const Events = require("../models/events");

function handle_request(msg, callback) {

    console.log("message body", msg);

    Events.find({}).sort({eventdate:1}) 
    .then(events => {
      if(events){
          console.log("Events in ascending order: ", events)
          callback(null,{success: true, customerEventsGet: events});
          //res.status(200).send({success: true, customerEventsGet: events});
      }
      else{
        callback(null,{success: false, customerEventsGet: events});
        //res.status(401).send({success:false, customerEventsGet: events});
      }
  })
  .catch(error => {
      console.log(error);
  })

}


exports.handle_request = handle_request;
