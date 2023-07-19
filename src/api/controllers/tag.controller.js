const { asyncHandler } = require('../middleware/asyncHandler');
const postService = require('../services/post.service');
const tagService = require('../services/tag.service');
const { generateTagSearchObject } = require('../services/tag.service');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc   Get All Distinct Tags
// @route  GET /tags
// @access Public
exports.find = asyncHandler(async (req, res, next) => {
    const result = await tagService.find();
    if (result.length === 0) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        message: `${result.length} tags be listed`,
        result,
    });
});

// @desc   Get Posts By Tag
// @route  GET /tags
// @access Public
exports.findPostsByTag = asyncHandler(async (req, res, next) => {
    const { params: { tags } } = req;
    const params = generateTagSearchObject(tags);
    const result = await postService.find(params);
    if (result.length === 0) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        message: `${result.length} posts be listed`,
        result,
    });
});
