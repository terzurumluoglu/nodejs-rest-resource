const { getAllPosts } = require('../services/post.service');

// @desc   Get All Posts
// @route  GET /posts
// @access Public
exports.getAllPosts = async (req, res, next) => {
    const posts = await getAllPosts();
    res.status(200).send(posts);
};
