const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    users: [mongoose.Schema.Types.ObjectId],
    names: [String],
    messages: [{
        message: String,
        sender: String,
        timeStamp: { type: Date, default: Date.now() }
    }],
},
    {
        versionKey: false
    });

module.exports = mongoose.model('message', messageSchema);
