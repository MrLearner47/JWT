
const Joi=require('joi')
const user=require('../model/user')
const userSchema=Joi.Object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .min(6) // Minimum length of 8 characters
    .max(30) // Optional maximum length (adjust based on requirements)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')) // Requires at least one lowercase, uppercase, number, and special symbol
    .required(),
    confirmPassword: Joi.ref('password').label('confirmPassword').required() 
})
module.exports.get_signup=(req,res)=>{
    res.render('signup')
}
module.exports.post_signup=async (req,res)=>{
    const {username,password,confirmPassword,email}= req.body
  try{ userSchema.validate(req.body)
      if(error){ 
        res.error("validation error has occured")
      }
    else{
     try{
     const User=user.create({username,email,password})
     res.status(201).json(User)
     }
     catch(error){
      res.error("User cannot be saved")
     }
    }
}
  catch(error){
       res.error("error has occured in the process of validation")
  }



}
module.exports.get_login=(req,res)=>{
    res.render('login')
}
module.exports.post_login=(req,res)=>{
    res.send("new user logged in")
}