class Player {
  constructor(game, x, y, d) {
    this.game = game;

    this.fly = '/images/player/jet.png';
    this.shootingImg = '/images/player/shoot.png';
    this.flying = false;
    this.shooting = false;
    this.running = false;
    this.x = x;
    this.y = y;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.direction = 'left';
    this.playerImg = new Image();
    this.playerImg.src = `/images/player/idle-${this.direction}.png`;
    this.control();
    this.canvas = canvas;
  }

  control() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      switch (key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (this.x > 0) {
            this.x -= 10;
            this.shooting = false;
          }
          if (this.y < 560) {
            this.y -= 3;
          }

          if (this.y > 560) {
            this.running = true;
          }
          this.direction = 'left';
          this.moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (this.x < 1420) {
            this.x += 15;
            this.shooting = false;
          }
          if (this.y < 560) {
            this.y -= 3;
          }
          if (this.y > 560) {
            this.running = true;
          }
          this.direction = 'right';
          this.flying = true;
          this.shooting = false;

          this.moveRight();
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (this.y > 0) this.y -= 15;
          this.shooting = false;
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (this.y < 590) this.y += 10;
          this.shooting = false;
          break;
      }

      this.flying = false;
      this.x += this.x_velocity;
      this.y += this.y_velocity;
      this.x_velocity *= 0.9;
      this.y_velocity *= 0.9;
    });
  }

  moveLeft() {
    this.x_velocity -= 0.5;
  }

  moveRight() {
    this.x_velocity += 0.5;
  }

  runLogic() {}

  paint() {
    const context = this.game.context;

    if (this.flying === false && this.y < 550) {
      this.y += 4; //gravity
    }

    if (this.y < 550) {
      this.playerImg.src = `/images/player/jet-${this.direction}.png`;
      this.running = false;
    } else if (this.y > 550) {
      this.playerImg.src = `/images/player/idle-${this.direction}.png`;
    }

    if (this.shooting === true) {
      this.playerImg.src = `/images/player/shoot-${this.direction}.png`;
    }

    if (this.running === true && this.shooting === false) {
      this.playerImg.src = `/images/player/run-1-${this.direction}.png`;
    }

    context.drawImage(this.playerImg, this.x, this.y, 90, 90);
  }
}
