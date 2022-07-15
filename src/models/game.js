const stringifyMoves = (move1, move2) => move1 + ',' + move2;

class Game {
  constructor(gameId, host) {
    this.id = gameId;
    this.host = host;
    this.players = [host];
    this.limit = 2;
  }

  join(player) {
    if (this.limit <= this.players.length) return false;

    this.players.push(player);

    return true;
  }

  playMove(playerName, move) {
    const player = this.players.find(({ name }) => name === playerName);

    if (player) {
      player.play(move);
    }
  }

  winner() {
    const [player1, player2] = this.players;

    const winnerMapper = {
      'paper,rock': player1,
      'rock,scissor': player1,
      'scissor,paper': player1,
      'rock,paper': player2,
      'scissor,rock': player2,
      'paper,scissor': player2
    };

    const move1 = player1.getMove();
    const move2 = player2.getMove();

    return winnerMapper[stringifyMoves(move1, move2)];
  }

  isDraw() {
    const winner = this.winner();

    if (winner) {
      return false;
    }

    return true;
  }

  stats() {
    return {
      started: this.players.length === this.limit,
      winner: this.winner(),
      draw: this.isDraw()
    }
  }
}

module.exports = { Game };
