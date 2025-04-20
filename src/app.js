const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")
app.use(express.json())
// const {authUser}=require("./middleware/authuser")

app.post("/signup",async(req,res)=>{
    const user= new User(req.body)

   
    try{
        user.save()
        res.send("data saved successfully")

    }
    catch(err){
        res.status(400).send(err.message)

    }
  


}

)
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
