const { slugify } = require('../utils/slugify');

class TagService {
    generateTagsArray = (tags) => {
        return tags.map(tag => {
            return {
                title: tag,
                slug: slugify(tag),
            };
        });
    }
};

module.exports = new TagService();

