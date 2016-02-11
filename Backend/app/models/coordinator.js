//doctor schema

var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var CoordinatorSchema = new Schema({
    Displayname: { type: String },
    Password: { type: String, require: 'Please enter password' },
    Email: { type: String, required: 'Please enter Email' }
});
module.exports = Mongoose.model('Coordinator', CoordinatorSchema);