const { getPostCollection } = require('../config/db');

const getAllPosts = async () => {
    const posts = (await getPostCollection().find({}).toArray());
    return posts;
}

module.exports = { getAllPosts };
