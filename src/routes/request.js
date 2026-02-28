const express=require("express")
const requestRouter=express.Router()
const{userAuth}=require("../middleware/auth");
const User = require("../models/user");

requestRouter.post("/sendConnectionReq",userAuth,(req,res)=>{
  const user=req.user
  res.send(user.firstName+" connection send")
})

module.exports=requestRouter