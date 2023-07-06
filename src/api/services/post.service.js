const { getDatabase } = require('../config/db');
const { collections } = require('../../constants');
const collection = getDatabase().collection(collections.posts);

class PostService {

    find = () => collection.find({}).toArray();
    
    findOne = (param) => collection.findOne(param);
    
    save = (post) => collection.insertOne(post);

    deleteOne = (param) => collection.deleteOne(param);
}

module.exports = new PostService();
