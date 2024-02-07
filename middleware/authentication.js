const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // check Header for authorization jwt token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attached the user to the req object which will be passed to the appropriate routes for access.
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new Error('Authentication invalid');
  }
};

module.exports = auth;