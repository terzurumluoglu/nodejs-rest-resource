const { asyncHandler } = require('../middleware/asyncHandler');
const { find, findOne } = require('../services/user.service');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc   Get All Users
// @route  GET /users
// @access Private
exports.find = asyncHandler(async (req, res, next) => {
    const query = req.query || {};
    const users = await find(query);
    res.status(200).send(users);
});

// @desc   Get UserById
// @route  GET /users/:id
// @access Private
exports.findOne = asyncHandler(async (req, res, next) => {
    const { params } = req;
    const result = await findOne(params);
    if (!result) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        message: `One user found with id: ${params._id}`,
        result,
    });
});
