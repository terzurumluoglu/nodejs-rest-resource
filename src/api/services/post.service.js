const { getDatabase } = require('../config/db');
const { collections } = require('../../constants');
const { slugify } = require('../utils/slugify');
const { generateTagsArray } = require('./tag.service');
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
    save = async ({ title, content, tags }) => {
        tags = generateTagsArray(tags);
        const slug = await this.#generateSlug(title);
        const post = { title, content, tags, slug, slugCount: 0 };
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
        const post = await this.findOne({ slug });
        if (!post) {
            return slug;   
        }
        const slugCount = post.slugCount + 1;
        await this.updateOne({ slug }, { $inc: { slugCount: 1 } });
        return `${slug}-${slugCount}`;
    };
}

module.exports = new PostService();
