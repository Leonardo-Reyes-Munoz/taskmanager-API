const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    'CreatedAt'
  );
  res.status(200).json({ tasks, count: tasks.length });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(200).send(task);
};

const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOne({ _id: taskId, createdBy: userId });

  if (!task) {
    throw new Error(`No task with id ${taskId}`);
  }

  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
    body: { title },
  } = req;

  if (title.trim() === 0) {
    throw new Error('Task title cannot be blank');
  }

  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new Error(`No task with id ${taskId}`);
  }

  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });

  if (!task) {
    throw new Error(`No task with id ${taskId}`);
  }

  res.status(200).send(`Success removing ${taskId}`);
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
