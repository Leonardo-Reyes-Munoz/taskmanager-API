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
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please provide email and password.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await (user.password === password);

  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  res.status(200).json({ user: { name: user.name } });
};

module.exports = {
  registerUser,
  getUserProfile,
};
