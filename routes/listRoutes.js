const express = require('express');
const router = express.Router();

const { getAllLists, createList } = require('../controllers/listControllers');

router.route('/').get(getAllLists).post(createList);

module.exports = router;
