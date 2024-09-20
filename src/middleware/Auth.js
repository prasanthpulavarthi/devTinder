const adminAuthHandler=(req,res,next)=>{
    const token="XYZ"
    const isAdminAuthorised= token === "XZ"
    if(!isAdminAuthorised){
        res.status(401).send("un authorised request")
    }else{
        next()
    }
}

const userAuthHandler=(req,res,next)=>{
    const token="XYZ"
    const isAdminAuthorised= token === "XYZ"
    if(!isAdminAuthorised){
        res.status(401).send("un authorised request")
    }else{
        next()
    }
}

module.exports={
    adminAuthHandler,userAuthHandler
}