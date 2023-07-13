const express = require('express');
const { findPostsByTag } = require('../controllers/tag.controller');
const router = express.Router();

router.route('/:tags').get(findPostsByTag);

module.exports = router;
