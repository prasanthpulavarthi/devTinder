const validator=require("validator")
const validateSignUpData=(req)=>{
    const {firstName,emailId,password}=req.body;
    if(!firstName){
        throw new Error("name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not valid")
    }
   
}

const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","gender","age","about","skills"];
    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    return isEditAllowed;
}


module.exports={
    validateSignUpData,
    validateEditProfileData
}