const Message = require('../models/message');

function handle_request(msg, callback) {

    console.log("message body", msg);


Message.findOne({RID:msg.RID, CID:msg.CID})
.then(messages=>{
    if(messages){
        
        console.log("The list of messages: ", messages.message);
        callback(null,{success:true, messages:messages.message});
        //res.status(200).send({success:true, messages:messages.message});
    }
})

}

exports.handle_request = handle_request;