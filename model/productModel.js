const mongoose = require("mongoose")
const Schema=mongoose.Schema



const productSchema = new Schema({
productName:{
    type: String,
    required : [true,"productName must be provided"]
},
productDescription:{
    type: String,
    required : [true,"provideDescription must be provided"]
},
productSize:{
    type:String,
    required : [true,"provideDescription must be provided"]
},
productBoughtPrice:{
    type: Number,
    required : [true,"productBoughtPrice must be provided"]
},
productSellingPrice:{
    type: Number,
    required : [true,"productSellingPrice must be provided"]
},
productStatus:{
    type: String,
    enum: ["available","unavailable"]
},
productImage:{
    type: String
},
user : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
},
{timestamps : true
})
const Product= mongoose.model("Product",productSchema)
module.exports=Product