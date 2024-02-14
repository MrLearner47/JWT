const jwt=require('jsonwebtoken')
const User=require('../model/user')
const dotenv=require('dotenv')
dotenv.config()
module.exports.requireToken= function(req,res,next){
const token=req.cookies.jwt
if(token){
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decodedToken)=>{
  if(err){
    console.log(err.message)
    res.redirect('/login')
  }else{
    console.log(decodedToken)
    next()
  }

  })
}
else{
    res.redirect('/login')
}
}
module.exports.checkUser=  function(req,res,next){
  const token=req.cookies.jwt
  if(token){
    jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,decodedToken)=>{
    if(err){
      console.log(err.message)
      res.locals.user=null
      next()
    }else{
      console.log(decodedToken)
      const user= await User.findById(decodedToken.id)
      res.locals.user=user
      next()
    }
  
    })
  }
  else{
    res.locals.user=null
    next()
  }
  }

