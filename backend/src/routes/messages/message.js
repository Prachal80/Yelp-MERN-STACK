var express = require("express");
const message = require("../../../models/message");
var app = express();
const router = express.Router();
const Message = require("../../../models/message");
const { checkCustomerAuth, auth } = require("../../../Utils/passport");
const { checkRestaurantAuth } = require("../../../Utils/passport");
const kafka = require("../../../kafka/client");
auth();


//Post message from restaurant
router.post(
    "/restaurant",
    checkRestaurantAuth,
    function (req, res) {
      console.log("Inside post message restaurant side");
      console.log("CID", req.body.CID);
      console.log("RID", req.body.RID);
      console.log("%%%%%%%", req.body);
      var m1 = req.body.name;
      var m2 = req.body.message;
      //var restaurant_message = req.body.name + "  " + req.body.message ; 
      var restaurant_message = m1 +" : "+ m2;

      var body = {
        message: restaurant_message,
        RID:req.body.RID, 
        CID:req.body.CID

      }
      kafka.make_request('restaurant_post_message', body , function (err,result){
        console.log("Post message restaurant", result);
        if(result.success){
          // console.log(result)
          res.status(200).send({success: true, message:result.message});
        }
        else{
          console.log('Error while sending message');
          res.status(400).send({success:false, message:result.message});
        }
      
      })
    // Message.find({RID:req.body.RID, CID:req.body.CID})
    // .then(message=>{
    //     if(message.length ){
    //       console.log("Message found between entities", message);
          
    //       Message.findOneAndUpdate({RID:req.body.RID, CID:req.body.CID},{ 
    //         $push: {
    //           message: restaurant_message,
    //         }
    //       }, {new:true})
    //       .then(updatedMessage =>{
    //         if(updatedMessage){
    //           console.log("Message updated :  " , updatedMessage);
        
    //           res.status(200).send({success:true, message:updatedMessage });
        
    //         }
    //       })
    //       .catch(err => {
    //           console.log("Error in updating message", err);
    //       })
    //     }
    //     else{
    //         var newMessage = new Message({
    //             CID: req.body.CID,
    //             RID: req.body.RID,
    //             message: restaurant_message
    //             })
            
    //             newMessage.save()
    //             .then(newmessage=>{
    //               if (newmessage) 
    //               {
    //                 console.log("Message saved in DB: ", newmessage);
    //                 res.status(200).send({ success: true, message: newmessage });
    //               }      
    //                else {
    //                     console.log("Message not saved");
    //                     res.status(400).send({ success: false , message:newmessage});
    //                   }
    //             })
    //     }
    //})

   
    });


//Post message from customer
router.post(
    "/customer",
    checkCustomerAuth,
    function (req, res) {
      console.log("Inside post message Customer side");
      console.log("CID", req.body.CID);
      console.log("RID", req.body.RID);
      console.log("%%%%%%%", req.body);
      var m1 = req.body.name;
      var m2 = req.body.message;
      //var customer_message = req.body.name + "  " + req.body.message ; 
      var customer_message = m1 +" : "+ m2;

      var body = {
        message: customer_message,
        RID:req.body.RID, 
        CID:req.body.CID

      }

      kafka.make_request('customer_post_message', body , function (err,result){
        console.log("Post message customer", result);
        if(result.success){
          // console.log(result)
          res.status(200).send({success: true, message:result.message});
        }
        else{
          console.log('Error while sending message');
          res.status(400).send({success:false, message:result.message});
        }
      
      })
    // Message.find({RID:req.body.RID, CID:req.body.CID})
    // .then(message=>{
    //     if(message.length ){
    //       console.log("Message found between entities", message);
          
    //       Message.findOneAndUpdate({RID:req.body.RID, CID:req.body.CID},{ 
    //         $push: {
    //           message: customer_message,
    //         }
    //       }, {new:true})
    //       .then(updatedMessage =>{
    //         if(updatedMessage){
    //           console.log("Message updated :  " , updatedMessage);
        
    //           res.status(200).send({success:true, message:updatedMessage });
        
    //         }
    //       })
    //       .catch(err => {
    //           console.log("Error in updating message", err);
    //       })
    //     }
    //     else{
    //         var newMessage = new Message({
    //             CID: req.body.CID,
    //             RID: req.body.RID,
    //             message: customer_message
    //             })
            
    //             newMessage.save()
    //             .then(newmessage=>{
    //               if (newmessage) 
    //               {
    //                 console.log("Message saved in DB: ", newmessage);
    //                 res.status(200).send({ success: true, message: newmessage });
    //               }      
    //                else {
    //                     console.log("Message not saved");
    //                     res.status(400).send({ success: false , message:newmessage});
    //                   }
    //             })
    //     }
    // })

   
    });



    //Get Messaages
    router.get("/messages", (req,res) => {
        console.log("Inside get all messages", req.query);
        let body = {
          RID:req.query.RID,
          CID:req.query.CID,
        }

        kafka.make_request('get_message', body , function (err,result){
          console.log("GET message", result);
          if(result.success){
            // console.log(result)
            res.status(200).send({success: true, messages:result.messages});
          }
          else{
            console.log('Error while getting message');
            res.status(400).send({success:false, messages:result.messages});
          }
        
        })

    }) 
   

module.exports = router;