const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://prasanthpulavarthi19:Saisai995@sainode.srq47.mongodb.net/devTinder`)
}

module.exports=connectDB
