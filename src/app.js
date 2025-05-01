const express=require("express");
const {connectDB}=require("./config/database")
const app=express();
const cookieParser=require("cookie-parser");
app.use(express.json())
app.use(cookieParser())
// const {authUser}=require("./middleware/authuser")

const authRouter=require("./router/auth");
const profileRouter=require("./router/profile");
const requestRouter=require("./router/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
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
