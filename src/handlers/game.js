const { Game } = require("../models/game.js");

const createGame = (games) => (req, res) => {
  const { playerName } = req.body;

  const game = games.newGame(playerName);
  req.session.gameId = game.id;

  req.session.saveSession(() => {
    res.setHeader('location', '/lobby');
    res.statusCode = 302;
    res.end('ok');
  });
};

module.exports = { createGame };
