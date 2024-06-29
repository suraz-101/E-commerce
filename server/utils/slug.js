const slug = require("slugify");

const generateSlug = (sentence) => {
  return slug(sentence, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
  });
};

module.exports = { generateSlug };
