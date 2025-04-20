const mongoose=require("mongoose");
const validator=require("validator")
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address" + value)
            }
        }

    },
    password:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        } 
    },
    photoUrl:{
        type:String,
        default:"https://avatars.githubusercontent.com/u/91949239?s=400&v=4",
    },
    about:{
        type:String,
        default:"This is a default description of user"
    },
    skills:{
        type:[String]
    },
   
}, {
    timestamps:true
})

const User=mongoose.model("User",userSchema);
module.exports=User;    