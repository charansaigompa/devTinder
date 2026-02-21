const express=require("express")
const app=express()


app.use("/test",(req,res)=>{
    res.send("i am testing now")
})
app.use("/hello",(req,res)=>{res.send("hello ")})
app.use("/",(req,res)=>{
    res.send("hello i am from dashboard")
})
app.listen(7777,()=>{
    console.log("server is running on port 7777")
})
