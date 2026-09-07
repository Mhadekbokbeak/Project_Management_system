const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
        name:{
            type:String,
            required:[true,"Please Signup"],
            trim:true
        },
        email:{
            type:String,
            required:[true,"Please Email"],
            unique:true,
            lowercase:true,
            trim:true
        },
        password: {
            type:String,
            required:[true,"Please password"],
            minlength:[6,"Length 6 char"]
        }
    
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);