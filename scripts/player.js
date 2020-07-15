class Player {
  constructor(game, x, y) {
    this.game = game;
    this.flying = false;
    this.shooting = false;
    this.running = false;
    this.x = x;
    this.width = 110;
    this.height = 110;
    this.y = y;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.direction = 'left';
    this.playerImages = images;
    this.playerImg = this.playerImages[`idle_${this.direction}`];
    // this.control();
    this.canvas = canvas;
    this.map = {};
  }

  onkeydown = (onkeydown = e => {
    e = e || event; // to deal with IE
    this.map[e.key] = e.type == 'keydown';

    switch (e.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (this.x > 0) {
          this.x -= 10;
          this.shooting = false;
        }
        if (this.y < 560) {
          this.y -= 3;
        }

        if (this.y > 545) {
          this.running = true;
        }
        this.direction = 'left';
        // this.moveLeft();
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
        if (this.y > 545) {
          this.running = true;
        }
        this.direction = 'right';
        this.flying = true;
        this.shooting = false;

        // this.moveRight();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.flying = true;
        if (this.y > 0) this.y -= 20;
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

  // control() {
  //   window.addEventListener('keydown', event => {
  //     const key = event.key;

  // moveLeft() {
  //   this.x_velocity -= 0.5;
  // }

  // moveRight() {
  //   this.x_velocity += 0.5;
  // }

  runLogic() {}

  paint() {
    const context = this.game.context;
    if (this.flying === false && this.y < 550) {
      this.y += 2; //gravity
    } else if (this.flying === true) {
      this.y -= 4;
    }
    //this.playerImages[`idle_${this.direction}`]
    if (this.y < 550) {
      this.playerImg = this.playerImages[`jet_${this.direction}`]; //this.playerImages[`idle-${this.direction}`]
      this.running = false;
    } else if (this.y > 550) {
      this.playerImg = this.playerImages[`idle_${this.direction}`];
    }

    if (this.shooting === true) {
      this.playerImg = this.playerImages[`shoot_${this.direction}`];
    }

    if (this.running === true && this.shooting === false) {
      this.playerImg = this.playerImages[`run_${this.direction}`];
    }

    context.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
  }
}
