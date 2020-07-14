class Bullet {
  constructor(game) {
    this.game = game;
    this.y = this.game.player.y;
    this.x = this.game.player.x;
    this.bulletImg = new Image();
    this.bulletImg.src = '/images/bullet.png';
    this.direction = this.game.player.direction;
    this.width = 60;
    this.height = 50;
    this.gunFired = false
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
