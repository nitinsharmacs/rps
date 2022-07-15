const request = require('supertest');
const assert = require('assert');

const { createApp } = require('../src/app.js');
const { Games } = require('../src/models/games.js');
const { Player } = require('../src/models/player.js');

let gameId;

const session = () => (req, res, next) => {
  req.session = {};

  req.session.saveSession = function (cb) {
    req.session.sessionId = '23232';
    res.setHeader('set-cookie', 'sessionId=23232');
    gameId = req.session.gameId;
    cb();
  };

  next();
};

const app = createApp({
  path: '/public',
  session,
  games: new Games()
});

describe('POST /create-game', () => {

  it('should create a game and redirect to game lobby', (done) => {
    request(app)
      .post('/create-game')
      .send({ playerName: 'abin' })
      .expect('location', '/lobby')
      .expect('set-cookie', 'sessionId=23232')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(gameId);
        gameId = null;
        done();
      });
  });
});

describe('GET /lobby', () => {
  const session = () => (req, res, next) => {
    req.session = {};
    req.session.gameId = 1;
    req.
      next();
  };

  const app = createApp({
    path: '/public',
    session,
    games: new Games()
  });

  it('should respond with lobby html page', (done) => {
    request(app)
      .get('/lobby')
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(200, done)
  });
});

describe('POST /play-move', () => {
  const session = () => (req, res, next) => {
    req.session = {};
    req.session.gameId = 1;
    req.
      next();
  };

  const games = new Games();
  games.newGame(new Player('abin'));

  const game = games.getGame(1);

  game.join(new Player('nitin'));

  const app = createApp({
    path: '/public',
    session,
    games
  });

  it('should respond with game stats', (done) => {
    request(app)
      .post('/play-move')
      .send({ playerName: 'abin', move: 'rock' })
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200, done)
  });
});