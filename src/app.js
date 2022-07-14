const { createRouter } = require('server');
const { createGame } = require('./handlers/game.js');
const { serveFileContents } = require('./serveFile.js');

const createApp = ({ path, session, games }) => {
  const routeHandlers = [
    session(),
    createGame(games),
    serveFileContents(path)
  ];

  return createRouter(...routeHandlers);
};

module.exports = { createApp };
