class Background {
  constructor(game, canvas, height, width) {
    this.game = game;
    this.canvas = canvas;
    this.bgTitle = new Image();
    this.width = 1500;
    this.height = 700;
    this.bgTitle.src = '/images/background/forest.jpg';
    this.highScore = 0;
  }
  paint() {
    const context = this.game.context;
    context.drawImage(this.bgTitle, 0, 0, this.width, this.height);
    context.save();
    context.fillStyle = 'gold';
    context.font = '40px sans-serif';
    context.fillText('High score: ' + this.highScore, 1200, 45);
    context.restore();
  }
}
