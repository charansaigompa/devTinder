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