const fs = require('fs');
const mime = require('mime-types');

const serveFile = (file, res, next) => {
  if (fs.existsSync(file)) {
    fs.readFile(file, (error, content) => {
      res.setHeader('Content-Type', mime.lookup(file));
      res.end(content);
    });
    return true;
  }
  return next();
};

const serveFileContents = (path = './public') =>
  (req, res, next) => {
    let { pathname } = req.url;
    if (req.matches('GET', '/')) {
      pathname = '/home.html';
    }
    return serveFile(path + pathname, res, next);
  };

module.exports = { serveFileContents };
