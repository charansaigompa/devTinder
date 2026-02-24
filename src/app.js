const express = require("express");
const app = express();
const connectDB=require("./config/database")
const User=require("./models/user")
app.use(express.json())
app.post("/signup",async(req,res)=>{
   const user=new User(req.body)
   try{
         await user.save()
   res.send("User Added Successfully")
   }
   catch(err){
   res.send("Error saving the user"+err.message)
   }

})
//get api
app.get("/user",async(req,res)=>{
  
  try{
      const user=await User.find({emailId:req.body.emailId})
      if(user.length===0) {
        res.status(404).send("User not found")
      }
      else {
          res.send(user)
      }
  }
  catch(err){
    res.status(400).send("something went wrong")
  }
 
 
})
app.get("/feed",async(req,res)=>{
  try{
    const users=await User.find({})
    res.send(users)
  }
  catch(err){
     res.status(400).send("something went wrong")
  }
})
//delete api
app.delete("/user",async(req,res)=>{
  try{
    const userId=req.body.userId
    await User.findByIdAndDelete(userId)
    res.send("deleted the user")
  }
  catch(err){
    res.send("something went wrong")
  }
})
// updating the user
app.patch("/user/:userId",async(req,res)=>{
  try{
    const userId=req.params?.userId
    const data=req.body
    const ALLOWED_UPDATES=[
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ]
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
    if(!isUpdateAllowed){
      throw new Error("Update not allowed")
    }
    if(data?.skills.length>10){
      throw new Error("Skills cannot be more than 10")
    }
    await User.findByIdAndUpdate(userId,data,{runValidators:true,})
    res.send("data updated")
  }
  catch(err){
    res.send("something went wrong "+err.message)
  }
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