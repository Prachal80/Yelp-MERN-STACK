const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    birthdate: String,
    city: String,
    state: String,
    country: String,
    nickname: String,
    headline: String,
    phone: String,
    blog: String,
    yelpingSince: String,
    thingsIlove: String,
    profilePic: String,
    findMeIn: String,
},
    {
        versionKey: false
    });

module.exports = mongoose.model('customer', customerSchema);