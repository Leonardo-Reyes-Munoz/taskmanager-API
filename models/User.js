const mongoose = require('mongoose');
const { TaskSchema } = require('./Task');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'Please provide a name. Names must be between 3 and 50 characters.',
    ],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address.'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email address',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [
      true,
      'Please provide a valid password. Passwords must be at least 6 characters',
    ],
    minlength: 6,
  },
  sudoName: {
    type: String,
    minlength: 3,
  },
  groups: [mongoose.ObjectId],
  children: [TaskSchema],
});

module.exports = mongoose.model('User', UserSchema);
