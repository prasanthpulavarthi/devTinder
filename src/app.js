const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")
const {validateSignUpData}=require("./utils/validation")
app.use(express.json())
// const {authUser}=require("./middleware/authuser")
const bcrypt=require("bcryptjs")

app.post("/signup",async(req,res)=>{
    try{
        validateSignUpData(req);
        const {firstName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10)
      console.log(passwordHash)  
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

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
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


app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
   
    try{
        const ALLOWED_UPDATES=["about","gender","photoUrl","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
    );
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        };
        if(data?.skills.length>10){
            throw new Error("skill cannot be more than 10")
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true
        });
    }
    catch(err){
        res.status(400).send("update error: "+err.message)
    }

});
app.get("/user",async (req,res)=>{
    try{
        const user=await User.findOne({age:req.body.age})
        res.send(user)

    }catch(err){
        res.status(err.message)
    }
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
