const Message = require('../models/message');

function handle_request(msg, callback) {

    console.log("message body", msg);


    Message.find({RID:msg.RID, CID:msg.CID})
    .then(message=>{
    if(message.length ){
      console.log("Message found between entities", message);
      
      Message.findOneAndUpdate({RID:msg.RID, CID:msg.CID},{ 
        $push: {
          message: msg.message,
        }
      }, {new:true})
      .then(updatedMessage =>{
        if(updatedMessage){
          console.log("Message updated :  " , updatedMessage);
          callback(null,{success:true, message:updatedMessage });
          //res.status(200).send({success:true, message:updatedMessage });
    
        }
      })
      .catch(err => {
          console.log("Error in updating message", err);
      })
    }
    else{
        var newMessage = new Message({
            CID: msg.CID,
            RID: msg.RID,
            message: msg.message
            })
        
            newMessage.save()
            .then(newmessage=>{
              if (newmessage) 
              {
                console.log("Message saved in DB: ", newmessage);
                callback(null,{success:true, message:newmessage });
                //res.status(200).send({ success: true, message: newmessage });
              }      
               else {
                    console.log("Message not saved");
                    callback(null,{success:false, message:newmessage });
                    //res.status(400).send({ success: false , message:newmessage});
                  }
            })
    }
})

}

exports.handle_request = handle_request;