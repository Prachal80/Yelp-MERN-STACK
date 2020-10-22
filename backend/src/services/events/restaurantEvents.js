var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Events = require('../../../models/events');
const Registrations = require('../../../models/registrations');

//Add Events
router.post(
  "/addRestaurantEvents",
  function (req, res) {
    console.log("Inside update Restaurant Add Event", req.body);
      var  newEvent = new Events({
          eventname: req.body.eventname,
          eventdescription: req.body.eventdescription,
          eventtime: req.body.eventtime,
          eventdate: req.body.eventdate,
          eventlocation: req.body.eventlocation,
          hashtags: req.body.hashtags,
          restaurantname: req.body.restaurantname,
          restaurantid: req.body.restaurantid,
        })
        console.log("new order",newEvent)
        newEvent.save((err)=>{
            if (err) {
              
                res.status(400).send({ success: false,  message: "" });
              } else {
                
                res.status(200).send({ success: true , message: ""});
              }
        });
}
);

//Get All Events
router.get("/getAllEvents", (req, res) => {
  console.log("get all events req data ", req.query);

  Events.find({restaurantid:req.query.RID})
  .then(events => {
    if(events){
        console.log("Get all Events customer: ", events)
        res.status(200).send({success: true, restaurantEventsGet: events});
    }
    else{
      res.status(401).send({success:false, restaurantEventsGet: events});
    }
})
.catch(error => {
    console.log(error);
})
 
});

// //Get Registered Customers
// router.get("/getRegisteredCustomers", (req, res) => {
//   console.log("req data ", req.query);


//   Registrations.find({restaurantid:req.query.RID})
//   .then(events=>{
//     console.log("Registered Events found: ", events);
//     res.status(200).send({success: true, getRegisteredCustomers: events[0]});
//   })
//   .catch(error=>{
//     console.log(error);
//   });
// });

module.exports = router;
