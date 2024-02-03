const getAllTasks = async (req, res) => {
  res.send('Get all Tasks Route.');
};

const createTask = async (req, res) => {
  res.send('Create task route');
};

const getTask = async (req, res) => {
  res.send('Get single task');
};

const updateTask = async (req, res) => {
  res.send('Update Task');
};

const deleteTask = async (req, res) => {
  res.send('Delete Task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
