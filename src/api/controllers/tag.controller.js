const { asyncHandler } = require('../middleware/asyncHandler');
const { find } = require('../services/post.service');
const { generateTagSearchObject } = require('../services/tag.service');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc   Get Posts By Tag
// @route  GET /tags
// @access Public
exports.findPostsByTag = asyncHandler(async (req, res, next) => {
    const { params: { tags } } = req;
    const params = generateTagSearchObject(tags);
    const data = await find(params);
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
