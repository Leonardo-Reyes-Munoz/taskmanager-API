const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task name cannot be empty.'],
      validate: {
        validator: function (value) {
          return value.trim().length > 0;
        },
      },
      maxLength: 50,
    },
    isCompleted: Boolean,
    dueDate: Date,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
