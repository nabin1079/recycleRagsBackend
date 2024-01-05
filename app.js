//after install, telling node to use express
const mongoose = require("mongoose")
const express = require("express")   
const app = express()

const { connectDatabase } = require("./database/database")
 
const { registerUser, loginUser } = require("./controller/auth/authController")

//routes
const authRoute = require("./routes/auth/authRoute")
const productRoute= require("./routes/user/productRoute")
const adminUsersRoute = require("./routes/admin/adminUsersRoute")
// const userReviewRoute = require("./routes/userReviewRoute")
const profileRoute=require("./routes/user/profileRoute")
const cartRoute=require("./routes/user/cartRoute")
const orderRoute=require("./routes/user/orderRoute")
const adminOrderRoute = require("./routes/admin/adminOrderRoute")



//routes ending


//Tell Node to use dotenv
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({extended : true}))


//telling nodejs to give access to uploads folder
app.use(express.static("uploads"))

connectDatabase();


//test api to check if server is live or not
app.get("/",(req,res)=>{

    res.status(200).json({
        message:"I am alive"
    })
})


app.use("",authRoute)
app.use("",productRoute)
app.use("",adminUsersRoute)
// app.use("",userReviewRoute)
app.use("",profileRoute)
app.use("",cartRoute)
app.use("",orderRoute)
app.use("",adminOrderRoute)

const PORT= process.env.PORT
//listen server
app.listen(PORT,(req,res)=>{        
    console.log("project is running at port"+" "+PORT)
})
