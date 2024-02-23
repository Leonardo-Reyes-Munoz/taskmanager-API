const mongoose = require('mongoose');
const TaskSchema = require('./Task');

const TodoLisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'TodoList name cannot be empty.'],
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
    },
    maxLength: 50,
  },
  authorizedUsers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  tasks: {
    type: [TaskSchema],
  },
});

module.exports = mongoose.model('TodoList', TodoLisSchema);
