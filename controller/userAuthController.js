const dotenv = require('dotenv');
const User = require('../model/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

dotenv.config();

// User validation schema
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
});

// Function to create JWT token
function createToken(id) {
  try {
    // Ensure JWT_SECRET_KEY is defined and accessible
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY environment variable not set');
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3d',
    });

    console.log("JWT created successfully");
    console.log(token);
    return token;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

// Signup route
module.exports.get_signup = (req, res) => {
  res.render('signup');
};

module.exports.post_signup = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const user = new User(req.body);
      await user.save();
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, expiresIn: '3d' });
      res.status(302).redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while saving the user.");
  }
};

module.exports.get_login = (req, res) => {
  res.render('login');
};

module.exports.post_login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, expiresIn: '3d' });
    res.redirect('/cars');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
module.exports.get_logout= function (req,res){
  res.cookie('jwt','',{expiresIn:'1'})
  res.redirect('/')
}
