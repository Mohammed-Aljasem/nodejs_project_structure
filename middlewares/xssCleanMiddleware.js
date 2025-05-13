const sanitizeHtml = require('sanitize-html');

const xssCleanMiddleware = (req, res, next) => {
   for (const [key, value] of Object.entries(req.body)) {
      req.body[key] =  sanitizeHtml(value, {
         allowedTags: ['img'],
      })
   }
   next()
}

module.exports = xssCleanMiddleware;
