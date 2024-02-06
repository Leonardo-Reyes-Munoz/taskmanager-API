const User = require('../models/User');

const registerUser = async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create(req.body);
    res.status(200).json({
      msg: 'Registration Successful',
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const getUserProfile = async (req, res) => {
  res.send('Get user profile route');
};

module.exports = {
  registerUser,
  getUserProfile,
};
