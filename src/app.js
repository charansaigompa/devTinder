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
    const isPasswordVaild=await user.validatePassword(password)//returns boolean
    if(isPasswordVaild){
      //creating jwt token
    
      const token= await user.getJWT()  //Here who ever the current user it will generate token for that user by userShema
      res.cookie("token",token)
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
