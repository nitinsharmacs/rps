const express = require('express');
const { createGame, lobby, playMove } = require('./handlers/game.js');

// middlewares
const { restrict } = require('./middlewares/restrict.js');

const createApp = ({ path, session, games }) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(session());
  app.use(express.static('public'));

  app.post('/create-game', createGame(games));

  app.use(restrict);

  app.get('/lobby', lobby);

  app.post('/play-move', playMove(games));

  app.use((err, req, res) => {
    console.log(err);
  });

  return app;
};

module.exports = { createApp };
