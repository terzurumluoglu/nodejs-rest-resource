const { find, findOne, save, deleteOne, updateOne } = require('../services/post.service');
const ErrorResponse = require('../utils/ErrorResponse');
const { convertIdToObjectId } = require('../utils/utils');

// @desc   Get All Posts
// @route  GET /posts
// @access Public
exports.find = async (req, res, next) => {
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
};

// @desc   Get Posts By Filter
// @route  GET /post(s)
// @access Public
exports.findOne = async (req, res, next) => {
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
};

// @desc   Create a New Post
// @route  POST /posts
// @access Public
exports.save = async (req, res, next) => {
    const { title, content } = req.body;
    const data = await save({ title, content });
    res.status(200).send({
        success: true,
        result: {
            message: 'The post was created successfully',
            data,
        },
    });
};

// @desc   Delete a Post
// @route  DELETE /posts/:_id
// @access Public
exports.deleteOne = async (req, res, next) => {
    let { params } = req;
    params = convertIdToObjectId(params);
    const data = await deleteOne(params);
    res.status(200).send({
        success: true,
        result: {
            message: 'The Post was deleted successfully',
            data
        },
    });
};

// @desc   Update a Post
// @route  PUT /posts/:_id
// @access Public
exports.updateOne = async (req, res, next) => {
    const { params } = req;
    const { title, content } = req.body;
    Object.keys(body).forEach(key => !body[key] && delete body[key]);
    const data = await updateOne(params, { $set: body });
    res.status(200).send({
        success: true,
        result: {
            message: 'The Post was updated successfully',
            data
        },
    });
}
