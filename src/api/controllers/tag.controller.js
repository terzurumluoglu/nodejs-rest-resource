const { find } = require('../services/post.service');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc   Get Posts By Tag
// @route  GET /tags
// @access Public
exports.findPostsByTag = async (req, res, next) => {
    const { params } = req;
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
};