const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"กรุณากรอกชื่อโปรเจกต์"],
        trim:true
    },
    descrition:{
        type:String,
        trim:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});


module.exports = mongoose.model("Project",projectSchema);