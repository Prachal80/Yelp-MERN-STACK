var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");

const Events = require('../../../models/events');
const Registrations = require('../../../models/registrations');

//Get all unregistered events
router.get("/getAllEvents", (req, res) => {
  //console.log("req data ", req.query);
  Events.find({})
  .then(events => {
    if(events){
        console.log("Events: ", events)
        res.status(200).send({success: true, customerEventsGet: events});
    }
    else{
      res.status(401).send({success:false, customerEventsGet: events});
    }
})
.catch(error => {
    console.log(error);
})
 
});

//Get Single Event
router.get("/getSingleEvent", (req, res) => {
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
router.get("/getRegisteredEvents", (req, res) => {
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
router.get("/getRegisteredCustomer", (req, res) => {
  console.log("req data ", req.query);

  Registrations.find({customerid : req.query.CID, restaurantid:req.query.restaurantid})
  .then(event => {
    if(event){
        console.log("Registered Events: ", event)
        res.status(200).send({success: true, getRegisteredCustomer: event});
    }
    else{
      console.log("Customer Registrations not found for an event")
      res.status(401).send({success:false, getRegisteredCustomer: event});
    }
})
.catch(error => {
    console.log(error);
})

});

// //Register for event
router.post("/registerEventCustomer", (req, res) => {
  console.log("Register event data ", req.body);

  var newRegistrations = new Registrations({
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
