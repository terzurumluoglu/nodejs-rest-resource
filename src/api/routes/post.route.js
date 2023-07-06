const express = require('express');
const router = express.Router();
const { deleteOne, find, findOne, save } = require('../controllers/post.controller');

router.route('/').get(find).post(save);

router.route('/:_id').get(findOne).delete(deleteOne);

module.exports = router;
