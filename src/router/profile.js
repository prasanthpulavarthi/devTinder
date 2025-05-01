const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middleware/userauth");
const {validateEditProfileData}=require("../utils/validation");

profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{
    
    const user=req.user;
    
    res.send(user)
    }catch(err){
        res.status(400).send("update error: "+err.message)
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invaild edit request")
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save()
        res.json({
            message:`${loggedInUser.firstName}, your profile is updated successfully`,
            data:loggedInUser
        })




    }catch(err){
        res.status(400).send("Error:"+ err.message)
    }
})

module.exports=profileRouter;