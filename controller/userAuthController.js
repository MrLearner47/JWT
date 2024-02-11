
const User = require('../model/user');
const Joi=require('joi')
const jwt=require('jsonwebtoken')
//user validation schema
userSchema=Joi.object({
  username:Joi.string().required(),
  email:Joi.string().email().required(),
  password:Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')).required(),
  confirmPassword:Joi.any().valid(Joi.ref('password')).required()
})
//jwt tokens
//declaring maximum age of 3 days
const maxage=3*24*60*60
function createToken(id){
  const token=jwt.sign({id},'iloveyou',{
    expiresIn:maxage,
  })
}

// Signup route

module.exports.get_signup = (req, res) => {
  res.render('signup'); // Assuming you have a "signup" template to render
};

module.exports.post_signup = async (req, res) => {
   console.log(req.body)
    try{
     const {error} =userSchema.validate(req.body)
     if(error){
      return res.status(400).json({ message: error.details[0].message });
     }
     else{
      const user = new User(req.body);
      await user.save();
      const token=createToken(user._id)
      res.cookie('jwt',token,{httpOnly:true,expiresIn:maxage*1000})
      res.status(302).redirect('/login')
     }
    } catch (err) {
    console.log(err, "An error occurred while saving the user.");
    res.send("An error occurred.");
  }
      };

module.exports.get_login = (req, res) => {
  res.render('login');
};

module.exports.post_login = async (req, res) => {
 const {username,password}=req.body
 try{
  const user=await User.login(username,password)
  res.redirect('/cars')
 }
 catch(err){
  res.json({"error":err.message})
 }

};
