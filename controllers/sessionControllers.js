const registerUser = async (req, res) => {
  res.send('Register user route');
};

const getUserProfile = async (req, res) => {
  res.send('Get user profile route');
};

module.exports = {
  registerUser,
  getUserProfile,
};
