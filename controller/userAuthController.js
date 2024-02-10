const User = require('../model/user'); // Assuming this line refers to your user model

// Signup route
module.exports.get_signup = (req, res) => {
  res.render('signup'); // Assuming you have a "signup" template to render
};

module.exports.post_signup = async (req, res) => {
  try {
    console.log(req.body)
    const user = new User(req.body);
    await user.save();
    res.status(201).send("The user has been registered.");
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
