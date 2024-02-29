const express = require('express');
const router = express.Router();

const {
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskControllers');

router.route('/').post(createTask);
router.route('/:id').patch(updateTask).delete(deleteTask);

module.exports = router;
