const express= require('express');
const app=express()


app.use("/test",(req,res)=>{
    res.send("hello form test")
})

app.get("/user",(req,res)=>{
    res.send({firstName:"sai",lastName:"prasanth"})
})
app.post("/user",(req,res)=>{
    //data saved in database
    res.send("data saved successfully")
})
app.delete("/user",(req,res)=>{
    //data saved in database
    res.send("data deleted")
})



app.listen(3000)