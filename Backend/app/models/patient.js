//patient schema
//var _Coordinator = require('./coordinator');
var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var PatientSchema = new Schema({
    Coordinator: {
        type: Schema.Types.ObjectId,
        ref: 'Coordinator'
    },
    Photo: { type: String },
    Lastname: { type: String, required: 'Please enter last name' },
    Firstname: { type: String, required: 'Please enter first name' },
    Middlename: { type: String },
    Email: { type: String, required: "Please enter Email" },
    Preferredname: { type: String },
    Title: { type: String },
    BloodType: { type: String },
    Address: { type: String },
    Column: { type: String },
    Suburb: { type: String },
    Postcode: { type: Number },
    State: { type: Number },
    HomePhone: { type: String },
    MobilePhone: { type: String, required: 'Please enter mobile phone' },
    DateOfBirth: { type: String },
    Gender: { type: String },
    MedicareNumber: { type: Number },
    MedicareRef: { type: Number },
    IHI: { type: Number },
    IHIStatus: { type: Number },
    SMSoptout: { type: Number },
    //
    Plans: [{
        Status: { type: String },
        ToImprove: { type: String },
        ToAcheive: { type: String },
        ToAcheive2: { type: String },
        Agreed: { type: String },
        Agreed2: { type: String },
        ByWhen: { type: String },
        ByWhen2: { type: String },
        ByWho: { type: String },
        ByWho2: { type: String },
        Progress: { type: String },

    }]

});
module.exports = Mongoose.model('Patient', PatientSchema);