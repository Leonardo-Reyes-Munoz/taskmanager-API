const express = require('express');
const router = express.Router();

const {
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskControllers');

router.route('/:listId').post(createTask);
router.route('/:listId/:taskId').patch(updateTask).delete(deleteTask);

module.exports = router;
