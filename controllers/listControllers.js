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

module.exports = {
  getAllLists,
  createList,
};
