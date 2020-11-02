const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var reviewSchema = new Schema({
   
    customerid: String,
    restaurantid: String,
    message: [{_id : false , type :String}],

},
    {
        versionKey: false
    });

module.exports = mongoose.model('review', reviewSchema);