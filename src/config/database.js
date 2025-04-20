const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://saisai:saisai123@sainode.f2utjpy.mongodb.net/devTinder")
}


module.exports={connectDB}