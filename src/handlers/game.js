const { Game } = require("../models/game.js");

const createGame = (games) => (req, res, next) => {
  if (!req.matches('POST', '/create-game')) {
    return next();
  }

  const { playerName } = req.body;

  games.newGame(playerName);
  res.setHeader('location', '/lobby');
  res.statusCode = 302;
  res.end('ok');
};

module.exports = { createGame };
