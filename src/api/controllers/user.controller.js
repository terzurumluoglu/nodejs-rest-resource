const { getAllUser, getUserById } = require('../services/user.service');

// @desc   Get All Users
// @route  GET /users
// @access Private
exports.getAllUsers = async (req, res, next) => {
    const users = await getAllUser();
    res.status(200).send(users);
};

// @desc   Get UserById
// @route  GET /users/:id
// @access Private
exports.getUserById = async (req, res, next) => {
    const { email } = req.params;
    const user = await getUserById(email);
    if (!user) {
        res.status(404).send('Not Found');
    }
    res.status(200).send(user);
};
