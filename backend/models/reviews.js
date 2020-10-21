const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    rating: String,
    review: String,
    reviewdate: String,
    customerid: String,
    customername: String,
    restaurantid: String,
    restaurantname: String,

},
    {
        versionKey: false
    });

module.exports = mongoose.model('review', reviewSchema);