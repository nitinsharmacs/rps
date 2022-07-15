const express = require('express');
const { createGame } = require('./handlers/game.js');

const createApp = ({ path, session, games }) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(session());
  app.use(express.static('public'));

  app.post('/create-game', createGame(games));

  return app;
};

module.exports = { createApp };
