const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")
// const {authUser}=require("./middleware/authuser")

app.post("/signup",async(req,res)=>{
    const user= new User({
        firstName:"sai111",
        lastName:"p",
        emailId:"sai@gmail.com",
        age:27,
    })
    try{
        user.save()
        res.send("data saved successfully")

    }
    catch(err){
        res.send("err saving the user")

    }
  


}

)

connectDB()
.then(()=>{
    console.log("data success")
    app.listen(3000,()=>{
        console.log("server")
    })
})
.catch((err)=>{
    console.log("data error")
})
