const { createRouter } = require('server');
const { serveFileContents } = require('./serveFile.js');

const createApp = ({ path, session }) => {
  const routeHandlers = [
    session(),
    serveFileContents(path)
  ];

  return createRouter(...routeHandlers);
};

module.exports = { createApp };
