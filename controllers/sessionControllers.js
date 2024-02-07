const User = require('../models/User');

const registerUser = async (req, res) => {
  console.log(req.body);

  const user = await User.create(req.body);
  res.status(200).json({
    msg: 'Registration Successful',
    user: user.name,
  });
};

const getUserProfile = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please provide email and password.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
};

module.exports = {
  registerUser,
  getUserProfile,
};
