const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name: String,
    email: String,
    password: String,
    location: String,
    address: String,
    state: String,
    country: String,
    description: String,
    headline: String,
    timings: String,
    contact: String,
    retings: String,
    method: String,
    cuisine: String,
    dishes: [{ dishname : String , ingredients: String , image: String , price: String , description: String  , category: String , restaurantid: String ,restaurantname: String}],
},
    {
        versionKey: false
    });

module.exports = mongoose.model('restaurant', restaurantSchema);