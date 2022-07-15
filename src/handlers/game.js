const { Player } = require('../models/player.js');

const createGame = (games) => (req, res) => {
  const { playerName } = req.body;

  const host = new Player(playerName);

  const game = games.newGame(host);
  req.session.gameId = game.id;

  req.session.saveSession(() => {
    res.setHeader('location', '/lobby');
    res.statusCode = 302;
    res.end('ok');
  });
};

const lobby = (req, res) => {
  res.type('html');
  res.end();
};

const playMove = (games) => (req, res) => {
  const { gameId } = req.session;
  const { playerName, move } = req.body;

  const game = games.getGame(gameId);

  game.playMove(playerName, move);

  const gameStats = game.stats();

  res.json(gameStats);
};

module.exports = {
  createGame,
  lobby,
  playMove
};
