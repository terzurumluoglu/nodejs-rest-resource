const slugify = (text, seperator = '-') => {
    return text.toUpperCase()
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')     // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, seperator);
};

module.exports = { slugify };
