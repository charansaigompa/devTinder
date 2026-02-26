const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken")
const{userAuth}=require("./middleware/auth")

app.use(express.json());
app.use(cookieParser())
app.post("/signup", async (req, res) => {
  try {
    const {firstName,lastName,emailId,password}=req.body;    
    //validate the user details
    validateSignUpData(req);
    //password encryption
    const passwordHash=await bcrypt.hash(password,10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});
app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordVaild=await bcrypt.compare(password,user.password);//returns boolean
    if(isPasswordVaild){
      //creating jwt token
      const {_id}=user;
      const token=jwt.sign({_id},"Devtinder@123",{expiresIn:"1h"})
      res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)
      })
      res.send("Login successful")
    }
    else{
      throw new Error("Invalid credentials")
    }
  }
  catch(err){
    res.send(err.message)
  }
})
app.get("/profile",userAuth,async(req,res)=>{
  try{
      user=req.user
      res.send(user)
  }catch(err){
    res.send("ERROR "+err.message)
  }
  

})
app.post("/sendConnectionReq",userAuth,(req,res)=>{
  const user=req.user
  res.send(user.firstName+" connection send")
})
//get api
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
//delete api
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("deleted the user");
  } catch (err) {
    res.send("something went wrong");
  }
});
// updating the user
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("data updated");
  } catch (err) {
    res.send("something went wrong " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection done ");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
