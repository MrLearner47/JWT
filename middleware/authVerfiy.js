const jwt=require('jsonwebtoken')

module.exports.requireToken= function(req,res,next){
const token=req.cookies.jwt
if(token){
  jwt.verify(token,'iloveyou',(err,decodedToken)=>{
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