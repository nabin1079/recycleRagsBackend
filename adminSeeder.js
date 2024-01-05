const User = require("./model/userModel")
const bcrypt=require("bcryptjs")
const adminSeeder= async()=>{
//Admin seeding

//check whether admin exist or not

const isAdminExists=await User.findOne({userEmail:"admin@gmail.com"})
if (!isAdminExists){
    await User.create({
        userEmail:"admin@gmail.com",
        userPassword:bcrypt.hashSync("admin",8),
        userPhoneNumber:"9821933744",
        userName:"admin",
        role:"admin"
    })
    console.log("admin seeded successfully")
}else 
{
    console.log("admin already seeded successfully")
}
}
module.exports=adminSeeder