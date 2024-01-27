const User = require("./model/userModel")
const bcrypt=require("bcryptjs")
const adminSeeder= async()=>{
//Admin seeding

//check whether admin exist or not

const isAdminExists=await User.findOne({userEmail:"recyclerags0@gmail.com"})
if (!isAdminExists){
    await User.create({
        userEmail:"recyclerags0@gmail.com",
        userPassword:bcrypt.hashSync(process.env.ADMIN_PASSWORD,8),
        userPhoneNumber:"9821933744",
        userFullName:"Dhruba Raj Parajuli",
        role:"admin"
    })
    console.log("admin seeded successfully")
}else 
{
    console.log("admin already seeded successfully")
}
}
module.exports=adminSeeder