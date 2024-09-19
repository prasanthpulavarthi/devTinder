const express= require('express');
const app=express()


app.use("/test",(req,res)=>{
    res.send("hello form test")
})

app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({firstName:"sai",lastName:"prasanth"})
})




app.listen(3000)