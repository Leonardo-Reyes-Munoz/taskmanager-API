const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task name cannot be empty.'],
      maxLength: 50,
    },
    completed: Boolean,
    dueDate: Date,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    groups: [mongoose.ObjectId],
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task, TaskSchema };
