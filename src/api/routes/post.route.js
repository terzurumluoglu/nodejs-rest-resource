const express = require('express');
const router = express.Router();
const { deleteOne, find, findOne, save, updateOne } = require('../controllers/post.controller');

router.route('/').get(find).post(save);

router.route('/:slug').get(findOne).put(updateOne).delete(deleteOne);

module.exports = router;
