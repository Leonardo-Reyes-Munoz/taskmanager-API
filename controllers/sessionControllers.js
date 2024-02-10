const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const registerUser = async (req, res) => {
  console.log(req.body);

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    msg: 'Registration Successful',
    user: user.name,
  });
};

const getUserProfile = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  registerUser,
  getUserProfile,
};
