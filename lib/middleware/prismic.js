const PrismicDOM = require('prismic-dom');
const Prismic = require('prismic-javascript');

function linkResolver(doc) {
  
  // Define the url depending on the document type
  if (doc.type === 'page') {
    return '/page/' + doc.uid;
  } else if (doc.type === 'blog_post') {
    return '/blog/' + doc.uid;
  }
  
  // Default to homepage
  return '/';
}

module.exports = async (req, res, next) => {
    res.locals.ctx = {
        endpoint: process.env.PRISMIC_ENDPOINT,
        linkResolver
    };
    res.locals.PrismicDOM = PrismicDOM;
    
    req.getPrismicApi = async () => {
        return await Prismic.getApi(process.env.PRISMIC_ENDPOINT, { req });
    };

    next();
};
