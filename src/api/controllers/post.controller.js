const { find, findOne, save, deleteOne } = require('../services/post.service');
const { slugify } = require('../utils/slugify');
const { convertIdToObjectId } = require('../utils/utils');

// @desc   Get All Posts
// @route  GET /posts
// @access Public
exports.find = async (req, res, next) => {
    const posts = await find();
    res.status(200).send(posts);
};

// @desc   Get Posts By Filter
// @route  GET /post(s)
// @access Public
exports.findOne = async (req, res, next) => {
    let { params } = req;
    params = convertIdToObjectId(params);
    const posts = await findOne(params);
    res.status(200).send(posts);
};

// @desc   Create a New Post
// @route  POST /posts
// @access Public
exports.save = async (req, res, next) => {
    const { title, content } = req.body;
    const slug = slugify(title);
    const data = await save({ title, content, slug });
    res.status(200).send(data);
};

// @desc   Delete a Post
// @route  DELETE /posts/:_id
// @access Public
exports.deleteOne = async (req, res, next) => {
    let { params } = req;
    params = convertIdToObjectId(params);
    const data = await deleteOne(params);
    res.status(200).send(data);
};
