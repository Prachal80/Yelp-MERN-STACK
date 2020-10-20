const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var dishSchema = new Schema({
     dishname : String , ingredients: String , image: String , price: String , description: String  , category: String , restaurantid: String ,restaurantname: String},
    
     {
        versionKey: false
    });

module.exports = mongoose.model('dish', dishSchema);