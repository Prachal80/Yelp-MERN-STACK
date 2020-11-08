var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Events = require('../../../models/events');
const Registrations = require('../../../models/registrations');
//const { checkCustomerAuth } = require("../../../Utils/passport");
const { checkRestaurantAuth , auth} = require("../../../Utils/passport");
const kafka = require("../../../kafka/client");
auth();

//Add Events
router.post(
  "/addRestaurantEvents",checkRestaurantAuth , 
  function (req, res) {
    console.log("Inside add restaurant event", req.body);

      let body = {
            eventname: req.body.eventname,
            eventdescription: req.body.eventdescription,
            eventtime: req.body.eventtime,
            eventdate: req.body.eventdate,
            eventlocation: req.body.eventlocation,
            hashtags: req.body.hashtags,
            restaurantname: req.body.restaurantname,
            restaurantid: req.body.restaurantid,
      } 
      console.log("Inside Restaurant add event",body);

      kafka.make_request('restaurant_add_event', body , function (err,result){

        console.log("Add event result", result);
        if(result.success){
          // console.log(result)
          res.status(200).send({success: true, event:result.event});
        }
        else{
          console.log('Error while adding event');
          res.status(400).send({success:false, event:null});
        }

      // var  newEvent = new Events({
      //     eventname: req.body.eventname,
      //     eventdescription: req.body.eventdescription,
      //     eventtime: req.body.eventtime,
      //     eventdate: req.body.eventdate,
      //     eventlocation: req.body.eventlocation,
      //     hashtags: req.body.hashtags,
      //     restaurantname: req.body.restaurantname,
      //     restaurantid: req.body.restaurantid,
      //   })
      //   console.log("new event",newEvent);
      //   newEvent.save()
      //   .then(event=>{
      //       if (event) 
      //       {
      //         console.log("Event saved in DB: ", event);
      //         res.status(200).send({ success: true, event: event });
      //       }      
      //        else {
      //             console.log("Event not saved");
      //             res.status(400).send({ success: false , event:null});
      //           }
      //     });
}
// .then(event=>{
//   if (event) 
//   {
//     console.log("Event saved in DB: ", event);
//     res.status(200).send({ success: true, event: event });
//   }      
//    else {
//         console.log("Event not saved");
//         res.status(400).send({ success: false , event:null});
//       }
// });

);
  });

//Get All Events
router.get("/getAllEvents", checkRestaurantAuth,(req, res) => {
  console.log("get all events req data ", req.query);

  Events.find({restaurantid:req.query.RID}).sort({eventdate:1})
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

//Get Registered Customers
router.get("/getRegisteredCustomers", checkRestaurantAuth,(req, res) => {
  console.log("req data ", req.query);


  Registrations.find({restaurantid:req.query.RID})
  .then(events=>{
    console.log("Registered Events found: ", events);
    res.status(200).send({success: true, getRegisteredCustomers: events});
  })
  .catch(error=>{
    console.log(error);
  });
});

module.exports = router;
