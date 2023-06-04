const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/post.controller');

router.route('/').get(getAllPosts);

module.exports = router;
