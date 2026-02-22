const express = require("express");
const app = express();
const connectDB=require("./config/database")
const User=require("./models/user")
app.post("/signup",async(req,res)=>{
   const user=new User({
    firstName:"Rama",
    lastName:"Krishna",
    emailId:"ramkrishna@email.com",
    password:"ram123*",
    age:"23",
    gender:"male",
   })
   await user.save()
   res.send("User Added Successfully")
})



connectDB()
.then(()=>{
    console.log("Database connection done ")
    app.listen(7777, () => {
  console.log("server is running on port 7777");
});
})
.catch((err)=>{
    console.log("Database cannot be connected")
})