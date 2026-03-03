const express=require("express")
const userRouter=express.Router()
const{userAuth}=require("../middleware/auth")
const User=require("../models/user")
const ConnectionRequest=require("../models/connectionRequest")

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
      const loggedInUser=req.user
      const connectionRequests=await ConnectionRequest.find({
        toUserId:loggedInUser._id ,
        status:"interested",
      }).populate("fromUserId","firstName lastName photoUrl age about skills")

      res.json({
        message:"Data fetched successfully",
        data:connectionRequests,
      })

   
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{

    try{
        const USER_SAFE_DATA="firstName lastName photoUrl age about skills"
      const loggedInUser=req.user
      const connectionRequests=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id,status:"accepted"},
            {toUserId:loggedInUser._id,status:"accepted"}
        ],
      }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)
        
       const data=connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
       })
    
      res.json({data:data})
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

module.exports=userRouter
