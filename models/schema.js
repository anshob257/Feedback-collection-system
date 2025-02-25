const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const feedbackschema = new Schema ({
    name: String,
    contactno: Number,
    email:String,
    feedbacktext: String,

});

module.exports=mongoose.model("Feedback",feedbackschema);