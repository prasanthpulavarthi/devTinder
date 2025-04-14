const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://saisai:saisai995@sainode.hpez8dk.mongodb.net/devTinder")
}


module.exports={connectDB}