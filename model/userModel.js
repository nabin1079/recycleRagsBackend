const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema=new Schema({
    userEmail:{
        type: String,
        required : [true,'Email must be provided'],
        unique: true,
        lowercase: true
    },
    userName:{
        type: String,
        required : [true,'Username must be provided'],
        unique: true
    },
    userPhoneNumber:{
        type: Number,
        required : [true,'Phonenumber must be provided']
    },
    userPassword:{
            type: String,
            required : [true,'Password must be provided']
},
role:{
    type: String,
    enum :["customer","admin"],
    default : "customer" ,
   
},
otp:{
    type: Number,
    // select: false
},
isOtpVerified:{
    type: Boolean,
    default:false,
    // select: false
},
cart : [{
    quantity : {
        type : Number,
        required : true
    },
    product : {type : Schema.Types.ObjectId, ref : "Product"}
}]
},{timestamps : true
})
const User = mongoose.model("User",userSchema)
module.exports = User

