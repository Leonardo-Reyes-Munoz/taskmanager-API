const Task = require('../models/Task');
const TodoList = require('../models/TodoList');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createTask = async (req, res) => {
  const {
    user: { userId },
    params: { listId },
    body: { title },
  } = req;

  console.log(req.params.listId);
  console.log('Extracted list ID value:', listId);
  console.log(req.body);

  if (title.trim() === 0) {
    throw new BadRequestError('Task title cannot be blank');
  }
  req.body.createdBy = req.user.userId;

  const updatedList = await TodoList.findOneAndUpdate(
    { _id: listId, authorizedUsers: userId },
    { $push: { tasks: req.body } },
    { new: true, runValidators: true }
  );
  console.log('Task successfully added:', updatedList);
  res.status(StatusCodes.CREATED).send(updatedList);
};

const updateTask = async (req, res) => {
  const {
    user: { userId },
    params: { taskId, todoListId },
    body: { title },
  } = req;

  if (title.trim() === 0) {
    throw new BadRequestError('Task title cannot be blank');
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
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ task });
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
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  res.status(StatusCodes.OK).send(`Success removing ${taskId}`);
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
