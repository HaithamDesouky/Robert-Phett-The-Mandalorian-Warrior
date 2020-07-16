class Powerup {
  constructor(x, y, purpose, game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.babyYoda = new Image();
    this.height = 100;
    this.width = 120;
    this.babyYoda.src = '/images/powerups/baby-yoda.png';
    this.health = new Image();
    this.health.src = '/images/powerups/health.png';
    this.purpose = purpose;
  }

  checkIntersection(player) {
    return (
      player.x + player.width > this.x &&
      player.x < this.x + this.width &&
      player.y + player.height > this.y &&
      player.y < this.y + this.height
    );
  }

  runLogic() {}

  paint() {
    let img = this.health;
    let msg;
    let points;
    if (this.purpose == 'health') {
      img = this.health;
      msg = '';
    } else if (this.purpose == 'points') {
      img = this.babyYoda;
      msg = 'Save me!!';
    }

    const context = this.game.context;
    context.drawImage(img, this.x, this.y, this.width, this.height);
    context.save();
    context.fillStyle = 'gold';
    context.font = '25px sans-serif';
    context.fillText(msg, this.x + 5, this.y);
    context.restore();
  }
}
