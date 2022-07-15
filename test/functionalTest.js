const request = require('supertest');
const assert = require('assert');

const { createApp } = require('../src/app.js');
const { Games } = require('../src/models/games.js');

const session = () => (req, res, next) => {
  req.session = {};

  req.session.saveSession = function (cb) {
    req.session.sessionId = '23232';
    res.setHeader('set-cookie', 'sessionId=23232');
    cb();
  };

  next();
};

describe('POST /create-game', () => {
  const app = createApp({
    path: '/public',
    session,
    games: new Games()
  });

  it('should create a game and redirect to game lobby', (done) => {
    request(app)
      .post('/create-game')
      .send({ playerName: 'abin' })
      .expect('location', '/lobby')
      .expect('set-cookie', 'sessionId=23232')
      .expect(302, done);
  });
});