const { Game } = require('./game.js');

class Games {
  #games;
  constructor() {
    this.#games = [];
  }

  newGame(playerName) {
    const gameId = this.#games.length;

    const game = new Game(gameId, playerName);
    this.#games.push(game);

    return game;
  }
}

module.exports = { Games };
