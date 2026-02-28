const express=require("express")
const profileRouter=express.Router()
const{userAuth}=require("../middleware/auth");
const User = require("../models/user");
const {validateEditProfileData}=require("../utils/validation")



profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  try{
     const user=req.user
      res.send(user)
  }catch(err){
    res.send("ERROR "+err.message)
  }
  

})
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if(!validateEditProfileData){
    throw new Error("Invalid Edit")
  }
  const loggedInUser=req.user
  Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key])
  await loggedInUser.save()
  res.json({message:`${loggedInUser.firstName+" "+loggedInUser.lastName}, you profile is updated`,
data:loggedInUser})


  }
  catch(err){
    res.send("Error "+err.message)
  }

})

module.exports=profileRouter