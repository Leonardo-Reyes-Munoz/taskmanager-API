const express = require('express');
const router = express.Router();

const {
  registerUser,
  getUserProfile,
} = require('../controllers/sessionControllers');

router.route('/register').post(registerUser);
router.route('/logon').post(getUserProfile);

module.exports = router;
