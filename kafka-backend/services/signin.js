var mongo = require('./mongo');
var bcrypt = require('bcrypt');


function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(function(err,db){
        if(err){
            callback(null,"Cannot connect to db");
        }
        else{
            console.log('Connected to mongodb');
            var query = {Email : msg.username};
            var dbo = db.db('usersignup');
            dbo.collection("usersignup").find(query).toArray(function(err,result){
                if(err){
                    //throw err;
                    callback(err,"Error");
                }
                if(result.length > 0){
                    var hash = result[0].Password;
                    bcrypt.compare(msg.password,hash,function(err,doesMatch){
                        if(doesMatch){
                            console.log("Inside result.length",result[0].userID);
                          
                            callback(null,result);
                        } else {
                            callback(null,[]);
                        }
                    });
                }
                else{
                    callback(null,[]);
                }
            });
        }
    });

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;