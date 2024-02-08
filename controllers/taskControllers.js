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

const getTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
