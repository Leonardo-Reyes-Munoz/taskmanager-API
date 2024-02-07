const express = require('express');
const router = express.Router();
// user authentication
const authenticateUser = require('../middleware/authentication');

const {
  registerUser,
  getUserProfile,
} = require('../controllers/sessionControllers');

router.route('/register').post(registerUser);
router.route('/logon').get(getUserProfile);

module.exports = router;
