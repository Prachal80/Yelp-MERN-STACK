var express = require("express");
const message = require("../../../models/message");
var app = express();
const router = express.Router();
const Message = require("../../../models/message");

//Post message from restaurant
router.post(
    "/restaurant",
  
    function (req, res) {
      console.log("Inside post message restaurant side");
      console.log("CID", req.body.CID);
      console.log("RID", req.body.RID);
      console.log("%%%%%%%", req.body);
      var m1 = req.body.name;
      var m2 = req.body.message;
      //var restaurant_message = req.body.name + "  " + req.body.message ; 
      var restaurant_message = m1 +" : "+ m2;
    Message.find({RID:req.body.RID, CID:req.body.CID})
    .then(message=>{
        if(message.length ){
          console.log("Message found between entities", message);
          
          Message.findOneAndUpdate({RID:req.body.RID, CID:req.body.CID},{ 
            $push: {
              message: restaurant_message,
            }
          }, {new:true})
          .then(updatedMessage =>{
            if(updatedMessage){
              console.log("Message updated :  " , updatedMessage);
        
              res.status(200).send({success:true, message:updatedMessage });
        
            }
          })
          .catch(err => {
              console.log("Error in updating message", err);
          })
        }
        else{
            var newMessage = new Message({
                CID: req.body.CID,
                RID: req.body.RID,
                message: restaurant_message
                })
            
                newMessage.save()
                .then(newmessage=>{
                  if (newmessage) 
                  {
                    console.log("Message saved in DB: ", newmessage);
                    res.status(200).send({ success: true, message: newmessage });
                  }      
                   else {
                        console.log("Message not saved");
                        res.status(400).send({ success: false , message:newmessage});
                      }
                })
        }
    })

   
    });


//Post message from customer
router.post(
    "/customer",
  
    function (req, res) {
      console.log("Inside post message Customer side");
      console.log("CID", req.body.CID);
      console.log("RID", req.body.RID);
      console.log("%%%%%%%", req.body);
      var m1 = req.body.name;
      var m2 = req.body.message;
      //var restaurant_message = req.body.name + "  " + req.body.message ; 
      var restaurant_message = m1 +" : "+ m2;
    Message.find({RID:req.body.RID, CID:req.body.CID})
    .then(message=>{
        if(message.length ){
          console.log("Message found between entities", message);
          
          Message.findOneAndUpdate({RID:req.body.RID, CID:req.body.CID},{ 
            $push: {
              message: restaurant_message,
            }
          }, {new:true})
          .then(updatedMessage =>{
            if(updatedMessage){
              console.log("Message updated :  " , updatedMessage);
        
              res.status(200).send({success:true, message:updatedMessage });
        
            }
          })
          .catch(err => {
              console.log("Error in updating message", err);
          })
        }
        else{
            var newMessage = new Message({
                CID: req.body.CID,
                RID: req.body.RID,
                message: restaurant_message
                })
            
                newMessage.save()
                .then(newmessage=>{
                  if (newmessage) 
                  {
                    console.log("Message saved in DB: ", newmessage);
                    res.status(200).send({ success: true, message: newmessage });
                  }      
                   else {
                        console.log("Message not saved");
                        res.status(400).send({ success: false , message:newmessage});
                      }
                })
        }
    })

   
    });



    //Get Messaages
    router.get("/messages", (req,res) => {
        console.log("Inside get all messages", req.query);

        Message.findOne({RID:req.query.RID, CID:req.query.CID})
        .then(messages=>{
            if(messages){
                
                console.log("The list of messages: ", messages.message);
                res.status(200).send({success:true, messages:messages.message});
            }
            

        })

    }) 
   

module.exports = router;