const { deleteOne, find, findOne } = require('../services/user.service');

// @desc   Get All Users
// @route  GET /users
// @access Private
exports.find = async (req, res, next) => {
    const users = await find();
    res.status(200).send(users);
};

// @desc   Get UserById
// @route  GET /users/:id
// @access Private
exports.findOne = async (req, res, next) => {
    const { params } = req;
    const user = await findOne(params);
    if (!user) {
        res.status(404).send('Not Found');
    }
    res.status(200).send(user);
};
