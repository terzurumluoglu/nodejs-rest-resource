const express = require('express');
const router = express.Router();
const { find, findOne } = require('../controllers/user.controller');
const { authorize } = require('../middleware/authorize');

router.route('/').get(authorize, find);

router.route('/:_id').get(findOne);

module.exports = router;
