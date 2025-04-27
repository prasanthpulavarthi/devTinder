const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")
const {validateSignUpData}=require("./utils/validation");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
app.use(express.json())
app.use(cookieParser())
// const {authUser}=require("./middleware/authuser")
const {userAuth}=require("./middleware/userauth");
const bcrypt=require("bcryptjs")

app.post("/signup",async(req,res)=>{
    try{
        validateSignUpData(req);
        const {firstName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10)
        const user= new User({firstName,emailId,password:passwordHash});
        await user.save()
        res.send("data saved successfully")

    }
    catch(err){
        res.status(400).send("Error : "+err.message)

    }
  


}

);
app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("invalid credentials")
        }

        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            const token=await user.getJWT();
           

            res.cookie("token",token,{expires:new Date(Date.now()+1*360000)});
            res.send("user login successful")
        }
        else{
            throw new Error("invalid credentials")
        }



    }
    catch(err){
        res.status(400).send(err.message)
    }
})
app.get("/profile",userAuth, async(req,res)=>{
    try{
    
    const user=req.user;
    
    res.send(user)
    }catch(err){
        res.status(400).send("update error: "+err.message)
    }
})
app.post("/sendconnectionrequest",userAuth,async(req,res)=>{
    const user=req.user;

    console.log("sending connection request");
    res.send(user.firstName+" sent a connection request")
})



app.delete("/user",async (req,res)=>{
    try{
        const name=req.body.firstName;
        const user=await User.deleteOne({firstName:name})
        res.send("deleted")

    }catch(err){
        res.send("error reaidng api")
    }
})

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
