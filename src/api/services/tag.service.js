const { slugify } = require('../utils/slugify');

class TagService {

    /**
     * generateTagsArray
     * @param tags //string 
     * @returns Object
     */
    generateTagsArray = (tags) => {
        return tags.map(tag => {
            return {
                title: tag,
                slug: slugify(tag),
            };
        });
    }

    /**
     * generateTagSearchObject
     * @param tag // string
     * @returns proper object for searching in Mongodb
     */
    generateTagSearchObject = (tag) => {
        return { tags: { $elemMatch: { slug: tag } } };
    };
};

module.exports = new TagService();

