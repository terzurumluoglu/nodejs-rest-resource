const { asyncHandler } = require('../middleware/asyncHandler');
const { find, findOne, save, deleteOne, updateOne } = require('../services/post.service');
const ErrorResponse = require('../utils/ErrorResponse');
const { convertIdToObjectId } = require('../utils/utils');

// @desc   Get All Posts
// @route  GET /posts
// @access Public
exports.find = asyncHandler(async (req, res, next) => {
    const query = req.query || {};
    const data = await find(query);
    if (data.length === 0) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        result: {
            message: `${data.length} posts be listed`,
            data,
        },
    });
});

// @desc   Get Post By Filter
// @route  GET /post
// @access Public
exports.findOne = asyncHandler(async (req, res, next) => {
    let { params } = req;
    const data = await findOne(params);
    if (!data) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        result: {
            message: 'One post be listed',
            data,
        },
    });
});

// @desc   Create a New Post
// @route  POST /posts
// @access Public
exports.save = asyncHandler(async (req, res, next) => {
    const { title, content, tags } = req.body;
    const data = await save({ title, content, tags });
    res.status(200).send({
        success: true,
        result: {
            message: 'The post was created successfully',
            data,
        },
    });
});

// @desc   Delete a Post
// @route  DELETE /posts/:_id
// @access Public
exports.deleteOne = asyncHandler(async (req, res, next) => {
    let { params } = req;
    params = convertIdToObjectId(params);
    const data = await deleteOne(params);
    res.status(204).send({
        success: true,
        result: {
            message: 'The Post was deleted successfully',
            data
        },
    });
});

// @desc   Update a Post
// @route  PUT /posts/:_id
// @access Public
exports.updateOne = asyncHandler(async (req, res, next) => {
    const { params } = req;
    const { body } = req;
    Object.keys(body).forEach(key => !body[key] && delete body[key]);
    const data = await updateOne(params, { $set: body });
    res.status(200).send({
        success: true,
        result: {
            message: 'The Post was updated successfully',
            data
        },
    });
});
