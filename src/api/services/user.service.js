const { getDatabase } = require('../config/db');
const { collections } = require('../../constants');
const { convertIdToObjectId } = require('../utils/utils');
const collection = getDatabase().collection(collections.users);

class UserService {

    find = async (query) => {
        const users = (await collection.find(query).toArray());
        return users.map(u => {
            const { resetPasswordKey, resetPasswordKeyExpire, password, ...user } = u;
            return user;
        });
    }

    findOne = async (params) => {
        params = convertIdToObjectId(params);
        const foundUser = await collection.findOne(params);
        if (!foundUser) {
            return;
        }
        const { resetPasswordKey, resetPasswordKeyExpire, password, ...user } = foundUser;
        return user;
    }

    deleteOne = (param) => collection.deleteOne(param);

}
module.exports = new UserService();

