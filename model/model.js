const mongoose=require("mongoose")

const Userschema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number
    },
    country:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:String
    },
    oldpass:{
        type:String
    },
    newpass:{
        type:String
    },
    avatar:{
        type: String
    }
})
const user=mongoose.model("User",Userschema)
module.exports=user

