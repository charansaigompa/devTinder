const express=require("express")
const app=express()
 app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({firstname:"ramu",secondname:"krishna"})
})
 app.get("/user2/:id/:password",(req,res)=>{
    console.log(req.params)
    res.send({firstname:"ramu",secondname:"krishna"})
})


app.listen(7777,()=>{
    console.log("server is running on port 7777")
})
  