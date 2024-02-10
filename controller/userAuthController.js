const User = require('../model/user'); // Assuming this line refers to your user model
const Joi=require('joi')
//user validation schema
userSchema=Joi.object({
  username:Joi.string().required(),
  email:Joi.string().email().required(),
  password:Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')).required(),
  confirmPassword:Joi.any().valid(Joi.ref('password')).required()
})
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
      res.status(201).send("The user has been registered.");
     }
    } catch (err) {
    console.log(err, "An error occurred while saving the user.");
    res.send("An error occurred.");
  }
      };

module.exports.get_login = (req, res) => {
  res.render('login');
};

module.exports.post_login = (req, res) => {
  res.send("New user logged in.");
};
