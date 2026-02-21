const express = require("express");
const app = express();
//Handling Auth middleware  for all GET POST,.. request
const {adminAuth,userAuth}=require("./middleware/auth");
app.use("/admin",adminAuth)
app.get("/admin/getDetails",(req,res)=>{
    res.send("All details are sent")
})
app.get("/admin/deleteUser",(req,res)=>{
    res.send("User details are deleted")
})
app.post("/user/login",(req,res)=>{
    res.send("you are logining in ")
})
app.get("/user/details",userAuth,(req,res)=>{
    res.send("you are seeing user details")
})


app.listen(7777, () => {
  console.log("server is running on port 7777");
});
