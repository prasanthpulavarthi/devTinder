const express= require('express');
const app=express()
app.use("/test",(req,res)=>{
    res.send("hello form test")
console.log("hello")
})
app.use((req,res)=>{
    res.send("hello11")
console.log("hello")
})

app.listen(7000)