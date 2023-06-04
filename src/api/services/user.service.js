const { getUserCollection } = require('../config/db');

const getAllUsers = async () => {
    const users = (await getUserCollection().find({}).toArray()).map(u => {
        const { resetPasswordKey, resetPasswordKeyExpire, password, ...user } = u;
        return user;
    });
    return users;
} 

const getUserById = async (email) => {
    const u = await getUserCollection().findOne({ email });
    const { resetPasswordKey, resetPasswordKeyExpire, password, ...user } = u;
    return user;
}

module.exports = { getAllUsers, getUserById };

