class Enemies {
  constructor(x, y, direction, game) {
    this.explosionImg = new Image();
    this.explosionImg.src = '/images/enemy/explosion.png';
    this.enemyImg = new Image();
    this.enemyImg.src = '/images/enemy/viper.gif';
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.width = 200;
    this.state = 'alive';
    this.height = 200;
    this.game = game;
    this.player = this.game.player;
    this.reasonable = 100;
    this.reasonableHeight = 20;
    this.speed = 15;
  }

  checkIntersection(player) {
    return (
      player.x + player.width - this.reasonable > this.x &&
      player.x < this.x + this.width - this.reasonable &&
      player.y + player.height - this.reasonable > this.y &&
      player.y < this.y + this.height - this.reasonableHeight
    );
  }
  runLogic() {
    if (this.direction === 'left') {
      this.x -= this.speed;
    } else if (this.direction === 'right') {
      this.x += this.speed;
    }
    if (this.state === 'dead') {
      this.y += 8;
    }
  }
  paint() {
    let source = this.enemyImg;

    if (this.state === 'alive') {
      source = this.enemyImg;
    } else if (this.state === 'dead') {
      source = this.explosionImg;
      this.width = 75;
      this.height = 75;
      this.speed = 5;
      this.y += 4;
    }
    const context = this.game.context;
    context.drawImage(source, this.x, this.y, this.width, this.height);
  }
}

class ScoreBoard {
  constructor(game) {
    this.game = game;
  }

  paint() {
    const context = this.game.context;
    const score = this.game.score;
    context.save();
    context.fillStyle = 'gold';
    context.font = '50px sans-serif';
    context.fillText('S C O R E: ' + score, 570, 50);
    context.restore();
  }
}
