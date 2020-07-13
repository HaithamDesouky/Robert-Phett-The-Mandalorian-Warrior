window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.display = 'none';
    const canvasElement = document.getElementById('canvas');

    const game = new Game(canvasElement);

    game.loop();
  };
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');

      this.background = new Background(this);
      this.player = new Player(this);
    }

    runLogic() {
      this.player.runLogic();
    }
    clean() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    paint() {
      this.background.paint();
      this.player.paint();
    }
    loop() {
      this.runLogic();
      this.clean();
      this.paint();

      setTimeout(() => {
        this.loop();
      }, 1000 / 20);
    }
  }

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

  // class Mouse {
  //   constructor(game) {
  //     this.game = game;
  //     this.canvas = canvas;
  //     this.canvas.addEventListener('click', this.checkMouse);
  //   }
  //   checkMouse(event) {
  //     let x = 0;
  //     let y = 0;
  //     if (event) {
  //       x = event.pageX - this.offsetLeft;
  //       y = event.pageY - this.offsetTop;
  //     }
  //     console.log('x: ' + x + ' y: ' + y);
  //   }
  //   runLogic() {
  //     this.checkMouse();
  //   }
  // }

  class Player {
    constructor(game) {
      this.game = game;

      this.fly = '/images/player/jet.png';
      this.shootingImg = '/images/player/shoot.png';
      this.flying = false;
      this.shooting = false;
      this.running = false;
      this.x = 100;
      this.x_velocity = 0;
      this.y_velocity = 0;
      // this.mouse = new Mouse(this);
      this.direction = 'left';
      this.playerImg = new Image();
      this.playerImg.src = `/images/player/idle-${this.direction}.png`;
      this.mouseY = 0;
      this.mouseX = 0;
      this.y = 580;
      this.control();
      this.shoot();
      this.canvas = canvas;
    }

    shoot() {
      window.addEventListener('click', event => {
        if (event) {
          this.mouseY = event.pageY - this.canvas.offsetTop;
          this.mouseX = event.pageX - this.canvas.offsetLeft;
          this.shooting = true;
        }
      });
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
            if (this.y > 0) this.y -= 10;
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

    runLogic() {
      console.log(this.shooting);
    }

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

      if (this.running === true) {
        this.playerImg.src = `/images/player/run-1-${this.direction}.png`;
      }

      console.log(this.direction);
      // switch (this.shooting) {
      //   case true:

      //     break;
      //   case false:
      //     this.playerImg.src = '/images/idle.png';
      // }

      context.drawImage(this.playerImg, this.x, this.y, 90, 90);
    }
  }
};

//let timestamp

//let shoothing timestap = timepstap - iff difference has pased
//if shooting is true and 2 seconds have passed
