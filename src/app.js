const express=require("express");
const app=express();



app.use("/test",(req,res)=>{
res.send("hello from ser")
})
app.use("/",(req,res)=>{
    res.send("kkk")
})



app.listen(3000,()=>{
    console.log("server")
})