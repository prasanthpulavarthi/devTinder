const express= require('express');
const app=express()
const {adminAuthHandler,userAuthHandler}=require("./middleware/Auth")


app.use("/admin",adminAuthHandler)

app.get("/admin/getAllUser",(req,res)=>{
    res.send("data received")
})

app.get("/user/login",
    (req,res,next)=>
    {
    res.send("user Logim")
},
)

app.get("/user/data",userAuthHandler,
    (req,res,next)=>
    {
    res.send("handler 1")
},
)




app.listen(3000)