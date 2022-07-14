const { startServer } = require('server');
const { createApp } = require('./src/app.js');
const session = require('myserver-session');

const app = createApp({
  path: './public',
  session
});

const PORT = 3000;

startServer(PORT, app);
