const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/user.controller');
const { authorize } = require('../middleware/authorize');

router.route('/').get(authorize, getAllUsers);
router.route('/:id').get(getUserById);

module.exports = router;
