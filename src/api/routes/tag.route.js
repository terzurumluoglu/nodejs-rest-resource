const express = require('express');
const { findPostsByTag } = require('../controllers/tag.controller');
const { find } = require('../controllers/tag.controller');
const router = express.Router();

router.route('/').get(find);
router.route('/:tags').get(findPostsByTag);

module.exports = router;
