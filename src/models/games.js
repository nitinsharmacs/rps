const { Game } = require('./game.js');

class Games {
  #games;
  constructor() {
    this.#games = [];
  }

  newGame(host) {
    const gameId = this.#games.length + 1;

    const game = new Game(gameId, host);
    this.#games.push(game);

    return game;
  }

  getGame(gameId) {
    return this.#games.find(({ id }) => id === gameId);
  }
}

module.exports = { Games };
