const { Player } = require('../models/player.js');
const { lobbyPage } = require('../views/lobby.js');

const createGame = (games) => (req, res) => {
  const { playerName } = req.body;

  const host = new Player(playerName);

  const game = games.newGame(host);
  req.session.gameId = game.id;
  req.session.playerName = playerName;

  req.session.saveSession(() => {
    res.setHeader('location', '/lobby');
    res.statusCode = 302;
    res.end();
  });
};

const joinGame = (games) => (req, res) => {
  const { gameId, playerName } = req.body;

  const game = games.getGame(+gameId);

  if (!game) {
    res.status(404).end('Game not found');
    return;
  }

  const player = new Player(playerName);
  game.join(player);

  req.session.gameId = game.id;
  req.session.playerName = playerName;

  req.session.saveSession(() => {
    res.redirect('/lobby');
  });
};

const lobby = (games) => (req, res) => {
  const { gameId, playerName } = req.session;

  const game = games.getGame(gameId);

  if (!game) {
    res.status(400).end('No game found!');
    return;
  }

  const player = game.findPlayer(playerName);

  res.type('html');
  res.end(lobbyPage(player, gameId));
};

const playMove = (games) => (req, res) => {
  const { gameId, playerName } = req.session;
  const { move } = req.body;

  const game = games.getGame(gameId);

  game.playMove(playerName, move);

  const gameStats = game.stats();

  res.json(gameStats);
};

const gameStats = (games) => (req, res) => {
  const { gameId } = req.session;

  const game = games.getGame(gameId);

  if (!game) {
    res.status(400).end('No game found!');
    return;
  }

  const gameStats = game.stats();

  res.json(gameStats);
};

module.exports = {
  createGame,
  joinGame,
  lobby,
  playMove,
  gameStats
};
