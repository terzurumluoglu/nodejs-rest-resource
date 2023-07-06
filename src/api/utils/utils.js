const { ObjectId } = require('mongodb');

convertIdToObjectId = (params) => {
    const keys = Object.keys(params);
    keys.forEach(key => {
        params[key] = key === '_id' ? new ObjectId(params[key]): params[key];
    });
    return params;
}

module.exports = {
    convertIdToObjectId,
};
