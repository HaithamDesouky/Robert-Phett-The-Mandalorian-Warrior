class Healthbar {
  constructor(game) {
    this.game = game;
    this.health = this.game.health;
    this.fullbar = new Image();
    this.fullbar.src = '/images/player/healthbar-3.jpg';
    this.twoBar = new Image();
    this.twoBar.src = '/images/player/healthbar-2.jpg';
    this.health = 3;
    this.currentHealth = this.fullbar;
    this.oneBar = new Image();
    this.oneBar.src = '/images/player/healthbar-1.jpg';
    this.zeroBar = new Image();
    this.zeroBar.src = '/images/player/healthbar-0.jpg';
  }

  runLogic() {
    if (this.health === 0) {
      this.game.running = false;
      this.game.lose();
    }
  }

  paint() {
    const context = this.game.context;

    let currentHealth = this.health;

    switch (currentHealth) {
      case 3:
        currentHealth = this.fullbar;
        break;
      case 2:
        currentHealth = this.twoBar;
        break;
      case 1:
        currentHealth = this.oneBar;
        break;
      case 0:
        currentHealth = this.zeroBar;
    }
    context.save();
    context.fillStyle = 'gold';
    context.font = '50px Mandalore';
    context.fillText('H E A L T H', 35, 45);
    context.restore();
    context.drawImage(currentHealth, 30, 60, 180, 40);
  }
}
