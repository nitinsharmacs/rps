const express = require('express');
const { createGame,
  lobby,
  playMove,
  joinGame,
  gameStats
} = require('./handlers/game.js');

// middlewares
const { restrict } = require('./middlewares/restrict.js');

const createApp = ({ path, session, games }) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(session());
  app.use(express.static('public'));

  app.post('/create-game', createGame(games));
  app.post('/join', joinGame(games));

  app.get('/lobby', restrict, lobby(games));
  app.get('/game-stats', restrict, gameStats(games));

  app.post('/play-move', playMove(games));

  return app;
};

module.exports = { createApp };
