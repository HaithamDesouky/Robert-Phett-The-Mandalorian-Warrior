class Enemies {
  constructor(x, y, direction, width, height, boss, health, game) {
    this.explosionImg = new Image();
    this.explosionImg.src = '/images/enemy/explosion.png';
    this.enemyImg = new Image();
    this.enemyImg.src = '/images/enemy/viper.gif';
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.width = width;
    this.state = 'alive';
    this.height = height;
    this.game = game;
    this.player = this.game.player;
    this.reasonable = 100;
    this.reasonableHeight = 20;
    this.speed = 9;
    this.bigBoss = new Image();
    this.bigBoss.src = '/images/enemy/luke.png';
    this.isBigBoss = boss;
    this.health = health;
    this.dying = new Image();
    this.dying.src = '/images/enemy/dying.png';
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
    let source;

    if (!this.isBigBoss) {
      if (this.state === 'alive') {
        source = this.enemyImg;
      } else if (this.state === 'dead') {
        source = this.explosionImg;
        this.width = 75;
        this.height = 75;
        this.speed = 5;
        this.y += 4;
      }
    }

    if (this.isBigBoss) {
      if (this.state === 'alive') {
        source = this.bigBoss;
      } else if (this.state === 'dead') {
        source = this.dying;
        this.width = 120;
        this.height = 170;
        this.speed = 2;
        this.y += 4;
        this.health = 2;
      }
    }

    const context = this.game.context;
    context.drawImage(source, this.x, this.y, this.width, this.height);
  }
}
