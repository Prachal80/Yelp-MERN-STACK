const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var registrationsSchema = new Schema({
    eventname: String,
    eventdescription: String,
    eventtime:String,
    eventdate: Date,
    eventlocation: String,
    hashtags: String,
    restaurantname: String,
    restaurantid: String,
    customername: String,
    customerid: String,

},
    {
        versionKey: false
    });

module.exports = mongoose.model('registrations', registrationsSchema);
