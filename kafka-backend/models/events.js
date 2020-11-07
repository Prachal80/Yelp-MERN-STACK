const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventname: String,
    eventdescription: String,
    eventtime: String,
    eventdate: Date,
    eventlocation: String,
    hashtags: String,
    restaurantname: String,
    restaurantid: String
},
    {
        versionKey: false
    });

module.exports = mongoose.model('event', eventSchema);
