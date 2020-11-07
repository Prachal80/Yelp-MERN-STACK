const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    dishname: String,
    price: String,
    dishimage: String,
    option: String,
    category: String,
    customerid: String,
    customername: String,
    restaurantid: String,
    restaurantname: String,
    status: String,
    time: String,
},
    {
        versionKey: false
    });

module.exports = mongoose.model('order', orderSchema);