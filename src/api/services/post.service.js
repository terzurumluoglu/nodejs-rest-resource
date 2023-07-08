const { getDatabase } = require('../config/db');
const { collections } = require('../../constants');
const { slugify } = require('../utils/slugify');
const collection = getDatabase().collection(collections.posts);

class PostService {

    /**
     * find
     * @param query
     * @returns Posts as Array
     */
    find = (query) => collection.find(query).toArray();
    
    /**
     * findOne
     * @param param 
     * @returns Post as Object
     */
    findOne = (param) => collection.findOne(param);
    
    /**
     * save
     * @param post
     * @returns MongoDB Response
     */
    save = async (post) => {
        const slug = await this.#generateSlug(post.title);
        post = { ...post, slug, slugCount: 0 };
        return collection.insertOne(post);
    };

    /**
     * deleteOne
     * @param param 
     * @returns MongoDB Response
     */
    deleteOne = (param) => collection.deleteOne(param);

    /**
     * updateOne
     * @param param
     * @param values
     * @returns MongoDB Response
     */
    updateOne = (param, values) => collection.updateOne(param, values);

    /**
     * #generateSlug
     * * private
     * @param title 
     * @returns string
     */
    #generateSlug = async (title) => {
        const slug = slugify(title);
        const post = await this.findOne({slug});
        const slugCount = post ? post.slugCount + 1 : 0;
        await this.updateOne({ slug }, { $set: { slugCount } });
        return !!slugCount ? `${slug}-${slugCount}` : slug;
    };
}

module.exports = new PostService();
