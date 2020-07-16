class ScoreBoard {
  constructor(game) {
    this.game = game;
  }

  paint() {
    const context = this.game.context;
    const score = this.game.score;
    context.save();
    context.fillStyle = 'gold';
    context.font = '80px Mandalore';
    context.fillText('S C O R E: ' + score, 575, 70);
    context.restore();
  }
}
