class Background {
  constructor(game, canvas, height, width) {
    this.game = game;
    this.canvas = canvas;
    this.bgTitle = new Image();
    this.width = 1500;
    this.height = 700;
    this.bgTitle.src = '/images/background/forest.jpg';
  }
  paint() {
    const context = this.game.context;
    context.drawImage(this.bgTitle, 0, 0, this.width, this.height);
  }
}


