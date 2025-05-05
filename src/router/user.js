const express=require("express");
const { userAuth } = require("../middleware/userauth");
const userRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user")

const USER_SAFE_DATA="firstName lastName age"


userRouter.get("/user/requests/received",userAuth,async (req,res)=>{

    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName","emailId"])
        res.json({message:"Data Fetched Successfully",
            data:connectionRequests,}
        )

    }catch(err){
        res.status(400).send("Error "+err.message)
    }
})
userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepected"},
                {fromUserId:loggedInUser._id,status:"accepected"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })

        res.json({data})

    }catch(err){
        res.status(400).send({message:"Error "+err.message})
    }
})
userRouter.get("/feed",userAuth,async(req,res)=>{



    try{
        const loggedInUser=req.user;

        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;

        const skip=(page - 1)*limit;
        const connectionRequests=await ConnectionRequest.find({
            $or:[{formUserId:loggedInUser._id,toUserId:loggedInUser._id}]
        }).select("fromUsedId toUserId").populate("fromUserId","firstName").populate("toUserId","firstName");

        const hideUsersFromFeed=new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());

        })
        const users=await User.find({
           $and:[{_id:{$ne:loggedInUser._id}}, {_id:{$nin:Array.from(hideUsersFromFeed)}}]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.send(users)


    }catch(err){
        res.status(400).json({message:err.message})
    }
})



module.exports=userRouter;