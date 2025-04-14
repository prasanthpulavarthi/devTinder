const authUser=   (req,res,next)=>{
    const token="xyz"
    const authorised=token==="xy"
    if(!authorised ){
        res.send("un authorised")
    }
    else{
        next()
    }
}
module.exports={
    authUser
}