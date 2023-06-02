const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');

const { asyncHandler } = require('./asyncHandler');

exports.authorize = asyncHandler(async (req, res, next) => {
    
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    if (!authorization.startsWith('Bearer')) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    const splitted = authorization.split(' ');

    if (splitted.length !== 2) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    const token = splitted[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        next();
    } catch (error) {
        return next(new ErrorResponse('Unauthorized', 401));
    }
});
