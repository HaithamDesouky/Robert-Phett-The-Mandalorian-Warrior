class Bullet {
  constructor(game) {
    this.game = game;
    this.y = this.game.player.y;
    this.x = this.game.player.x;
    this.bulletImg = new Image();
    this.bulletImg.src = '/images/player/bullet.png';
    this.direction = this.game.player.direction;
    this.width = 30;
    this.height = 9;
    this.gunFired = false;
  }
  runLogic() {
    if (this.direction === 'right') {
      this.x += 30;
    } else if (this.direction === 'left') {
      this.x -= 30;
    }
  }
  paint() {
    const context = this.game.context;
    context.drawImage(this.bulletImg, this.x, this.y, this.width, this.height);
  }
}
