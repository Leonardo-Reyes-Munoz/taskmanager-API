const TodoList = require('../models/TodoList');
const { StatusCodes } = require('http-status-codes');

const getAllLists = async (req, res) => {
  const listData = await TodoList.find({
    authorizedUsers: req.user.userId,
  }).sort('CreatedAt');
  res.status(StatusCodes.OK).json({ listData, count: listData.length });
};

const createList = async (req, res) => {
  req.body.authorizedUsers = req.user.userId;
  // console.log(req.body);
  const list = await TodoList.create(req.body);
  res.status(StatusCodes.CREATED).send(list);
};

const deleteList = async (req, res) => {
  const {
    user: { userId },
    params: { id: listId },
  } = req;

  const list = await TodoList.findOneAndDelete({
    _id: listId,
    authorizedUsers: userId,
  });

  if (!list) {
    throw new NotFoundError(`No list with id ${listId}`);
  }

  res.status(StatusCodes.OK).send(`Success removing ${listId}`);
};

module.exports = {
  getAllLists,
  createList,
  deleteList,
};
