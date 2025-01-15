import mongoose from "mongoose";


const userSchema  = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    profilePhoto:{
        type:String,
       default:""
    },
    gender:{
        type:String,
        enum: ["Male","Female"],
        required:true,
    },

},{timestamps:true})
export const userModel = mongoose.model("User",userSchema);