const express = require('express');
const router = express.Router();

const {
  getAllLists,
  createList,
  deleteList,
} = require('../controllers/listControllers');

router.route('/').get(getAllLists).post(createList);
router.route('/:id').delete(deleteList);

module.exports = router;
