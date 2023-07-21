const { asyncHandler } = require('../middleware/asyncHandler');
const { find, findOne, save, deleteOne, updateOne } = require('../services/post.service');
const ErrorResponse = require('../utils/ErrorResponse');
const { convertIdToObjectId } = require('../utils/utils');

// @desc   Get All Posts
// @route  GET /posts
// @access Public
exports.find = asyncHandler(async (req, res, next) => {
    const query = req.query || {};
    const result = await find(query);
    if (result.length === 0) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        message: `${result.length} posts be listed`,
        result,
    });
});

// @desc   Get Post By Filter
// @route  GET /post
// @access Public
exports.findOne = asyncHandler(async (req, res, next) => {
    let { params } = req;
    const result = await findOne(params);
    if (!result) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        message: 'One post be listed',
        result,
    });
});

// @desc   Create a New Post
// @route  POST /posts
// @access Public
exports.save = asyncHandler(async (req, res, next) => {
    const { title, content, tags = [] } = req.body;
    const result = await save({ title, content, tags });
    res.status(200).send({
        success: true,
        message: 'The post was created successfully',
        result,
    });
});

// @desc   Delete a Post
// @route  DELETE /posts/:_id
// @access Public
exports.deleteOne = asyncHandler(async (req, res, next) => {
    let { params } = req;
    params = convertIdToObjectId(params);
    const result = await deleteOne(params);
    res.status(204).send({
        success: true,
        message: 'The Post was deleted successfully',
        result,
    });
});

// @desc   Update a Post
// @route  PUT /posts/:_id
// @access Public
exports.updateOne = asyncHandler(async (req, res, next) => {
    const { params } = req;
    const { body } = req;
    Object.keys(body).forEach(key => !body[key] && delete body[key]);
    const result = await updateOne(params, { $set: body });
    res.status(200).send({
        success: true,
        message: 'The Post was updated successfully',
        result,
    });
});
