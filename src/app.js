const express= require('express');
const connectDB = require("./utils/database");
const User=require("./models/user")

const app=express()
app.use(express.json())


app.post("/signup", async(req,res)=>{
const user= new User(req.body)

try{
    await user.save();
    res.send("data posted succssfuly")
}
catch(err){
    res.status(400).send("error saving the user"+err.messsage)

}



})



connectDB()
.then(()=>{
    console.log("conncted succssfully");
app.listen(3000,()=>{
    console.log("server is listnong to port 3000")
})


})
.catch((err)=>{
    console.log("not connectd")
})




