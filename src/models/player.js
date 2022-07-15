class Player {
  constructor(name) {
    this.name = name;
    this.moves = [];
  }

  play(move) {
    this.moves.push(move);
  }

  getMove() {
    const [move] = this.moves.slice(-1);
    return move;
  }
}

module.exports = { Player };
