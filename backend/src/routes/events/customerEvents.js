var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");
const Events = require('../../../models/events');
const Registrations = require('../../../models/registrations');
const { checkCustomerAuth, auth } = require("../../../Utils/passport");
//const { checkRestaurantAuth , auth} = require("../../../Utils/passport");
const kafka = require("../../../kafka/client");

auth();


//Get all unregistered events in ascending order
router.get("/getAllEvents/asc",checkCustomerAuth, (req, res) => {
  //console.log("req data ", req.query);

  let body = {}

  kafka.make_request('customer_get_events_asc', body , function (err,result){
    console.log("Get Event customer in Asecnding order", result);
    if(result.success){
      // console.log(result)
      res.status(200).send({success: true, customerEventsGet:result.customerEventsGet});
    }
    else{
      console.log('Error while getting events');
      res.status(400).send({success:false, customerEventsGet:result.customerEventsGet});
    }
  
  })
 
});

//Get all unregistered events in descending order
router.get("/getAllEvents/desc",checkCustomerAuth, (req, res) => {
  //console.log("req data ", req.query);

  let body = {}

  kafka.make_request('customer_get_events_desc', body , function (err,result){
    console.log("Get Event customer in Descending order", result);
    if(result.success){
      // console.log(result)
      res.status(200).send({success: true, customerEventsGet:result.customerEventsGet});
    }
    else{
      console.log('Error while getting events');
      res.status(400).send({success:false, customerEventsGet:result.customerEventsGet});
    }
  
  })
 
});

//Get Single Event
router.get("/getSingleEvent", checkCustomerAuth,(req, res) => {
  console.log("Single event query ", req.query.eventid);

  Events.find({_id: req.query.eventid})
  .then(event => {
    if(event){
        console.log("Individual Event: ", event)
        res.status(200).send({success: true, customerEventDetails: event});
    }
    else{
      res.status(401).send({success:false, customerEventDetails: event});
    }
})
.catch(error => {
    console.log(error);
})

});

//Get Registered Events
router.get("/getRegisteredEvents",checkCustomerAuth, (req, res) => {
  console.log("req data ", req.query);

  Registrations.find({customerid : req.query.CID})
  .then(event => {
    if(event){
        console.log("Registered Events: ", event)
        res.status(200).send({success: true, getRegisteredEvents: event});
    }
    else{
      res.status(401).send({success:false, getRegisteredEvents: event});
    }
})
.catch(error => {
    console.log(error);
})
});

// //Get customer registration from the registration table to check whether the customer is registered or not
router.get("/getRegisteredCustomer", checkCustomerAuth,(req, res) => {
  console.log("req data for checking whether customer is registered or not", req.query);

  Registrations.find({customerid : req.query.CID, eventid:req.query.eventid})
  .then(event => {
    if(event.length){
        console.log("Registered Events: ", event)
        res.status(200).send({success: true, getRegisteredCustomer: event});
    }
    // else{
    //   console.log("Customer Registrations not found for an event")
    //   res.status(401).send({success:false, getRegisteredCustomer: event});
    // }
})
.catch(error => {
    console.log(error);
})

});

// //Register for event
router.post("/registerEventCustomer", (req, res) => {
  console.log("Register event data ", req.body);

  var newRegistrations = new Registrations({
    eventid: req.body.eventid,
    eventname:req.body.eventname,
    reventdescription:req.body.eventdescription,
    eventtime:req.body.eventtime,
    eventdate:req.body.eventdate,
    eventlocation:req.body.eventlocation,
    hashtags:req.body.hashtags,
    restaurantname:req.body.restaurantname,
    restaurantid:req.body.restaurantid,
    customername:req.body.customername,
    customerid:req.body.customerid,
  })

  newRegistrations.save(err=>{
    if (err) {

      res.status(400).send({ success: false,  message: "" });
    } else {

      res.status(200).send({ success: true , message: ""});
    }
  });
});

module.exports = router;
