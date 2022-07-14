const { startServer } = require('server');
const { createApp } = require('./src/app.js');
const { Games } = require('./src/models/games.js');
const session = require('myserver-session');

const main = () => {

  const games = new Games();

  const app = createApp({
    path: './public',
    session,
    games
  });

  const PORT = 3000;
  startServer(PORT, app);
};

main();
