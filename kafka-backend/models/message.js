const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var reviewSchema = new Schema({
   
    CID: String,
    RID: String,
    message: [{_id : false , type :String}],

},
    {
        versionKey: false
    });

module.exports = mongoose.model('message', reviewSchema);