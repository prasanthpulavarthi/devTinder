const express= require('express');
const connectDB = require("./utils/database");
const User=require("./models/user");

const app=express()
app.use(express.json())


// app.post("/signup", async(req,res)=>{
// const user= new User(req.body)

// try{
//     await user.save();
//     res.send("data posted succssfuly")
// }
// catch(err){
//     res.status(400).send("error saving the user"+err.messsage)

// }



// })

//for delete
// app.delete("/user", async(req,res)=>{
//     const userID= req.body.userID
//      try{
//         const user=await User.findByIdAndDelete(userID)
//         res.send("data posted succssfuly")
//     }
//     catch(err){
//         res.status(400).send("error saving the user"+err.messsage)
    
//     }
// })

//update
app.patch("/user", async(req,res)=>{
    const id=req.body.userID
    const data=req.body
    try{
    await User.findByIdAndUpdate(id,data)
        res.send("data changes successfully")


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




