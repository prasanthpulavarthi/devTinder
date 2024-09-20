const express= require('express');
const app=express()


app.get("/user",
    (req,res,next)=>
    {
    // res.send("handler 1")
    next()
},
(req,res,next)=>
    {
    // res.send("handler 2")
    next()
},



)




app.listen(3000)