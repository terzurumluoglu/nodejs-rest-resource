const { getAllUser, getUserById } = require('../services/user.service');

// @desc   Get All Users
// @route  GET /users
// @access Private
exports.getAllUsers = (req, res, next) => {
    const users = getAllUser();
    res.status(200).send(users);
};

// @desc   Get UserById
// @route  GET /users/:id
// @access Private
exports.getUserById = (req, res, next) => {
    const { id } = req.params;
    const user = getUserById(+id);
    if (!user) {
        res.status(404).send('Not Found');
    }
    res.status(200).send(user);
};
