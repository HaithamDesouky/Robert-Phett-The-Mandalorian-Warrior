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
      this.player = new Player(this, 200, 580, -1);
      this.bullet = new Bullet(this);
      this.bullets = [];
      this.shoot();
    }

    shoot() {
      window.addEventListener('keydown', event => {
        const key = event.code;
        switch (key) {
          case 'Space':
            event.preventDefault();
            this.player.shooting = true;

            const bullet = new Bullet(this);
            this.bullets.push(bullet);
            console.log(this.bullets);
            console.log('hi');
            break;
        }
        // if (event) {
        //   // this.mouseY = event.pageY - this.canvas.offsetTop;
        //   // this.mouseX = event.pageX - this.canvas.offsetLeft;

        // }
      });
    }
    runLogic() {
      this.player.runLogic();
      if (this.bullets.length > 0) {
        for (let bullet of this.bullets) {
          console.log(bullet);
          bullet.runLogic();
        }
      }
    }
    clean() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    paint() {
      this.background.paint();
      this.player.paint();
      if (this.bullets.length > 0) {
        for (let bullet of this.bullets) {
          bullet.paint();
        }
      }
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

  class Bullet {
    constructor(game) {
      this.game = game;
      this.y = this.game.player.y;
      this.x = this.game.player.x;
      this.bulletImg = new Image();
      this.bulletImg.src = '/images/bullet.png';
    }
    runLogic() {
      if (this.game.player.direction === 'right') {
        this.x += 50;
      } else if (this.game.player.direction === 'left') {
        this.x -= 50;
      }
    }
    paint() {
      const context = this.game.context;
      context.drawImage(this.bulletImg, this.x, this.y, 60, 50);
    }
  }
};

//let timestamp

//let shoothing timestap = timepstap - iff difference has pased
//if shooting is true and 2 seconds have passed
