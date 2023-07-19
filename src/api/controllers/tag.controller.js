const { asyncHandler } = require('../middleware/asyncHandler');
const postService = require('../services/post.service');
const tagService = require('../services/tag.service');
const { generateTagSearchObject } = require('../services/tag.service');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc   Get All Distinct Tags
// @route  GET /tags
// @access Public
exports.find = asyncHandler(async (req, res, next) => {
    const data = await tagService.find();
    if (data.length === 0) {
        return next(new ErrorResponse('Not Found', 404));
    }
    res.status(200).send({
        success: true,
        result: {
            message: `${data.length} tags be listed`,
            data,
        },
    });
});

// @desc   Get Posts By Tag
// @route  GET /tags
// @access Public
exports.findPostsByTag = asyncHandler(async (req, res, next) => {
    const { params: { tags } } = req;
    const params = generateTagSearchObject(tags);
    const data = await postService.find(params);
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
