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
      this.running = true;
      this.bullet = new Bullet(this);
      this.bullets = [];
      this.shoot();
      this.enemies = [];
      this.createEnemy();
      this.score = 0;
      this.scoreBoard = new ScoreBoard(this);
      this.healthbar = new Healthbar(this);
      this.health = 3;
    }

    createEnemy() {
      if (this.enemies.length < 2) {
        let randomHeight = Math.random() * 450;
        const enemy = new Enemies(1500, randomHeight, this);
        this.enemies.push(enemy);
      }

      setTimeout(() => {
        this.createEnemy();
      }, 1000);
    }

    shoot() {
      window.addEventListener('keypress', event => {
        const key = event.code;
        switch (key) {
          case 'Space':
            this.player.shooting = true;
            this.bullet.gunFired = true;
            const bullet = new Bullet(this);
            this.bullets.push(bullet);
        }
      });
    }
    runLogic() {
      this.player.runLogic();
      if (this.bullets.length > 0) {
        for (let bullet of this.bullets) {
          bullet.runLogic();
          this.gunFired = true;
          if (bullet.x < -50 || bullet.x > 1400) {
            this.bullets.splice(bullet, 1);
          }

          for (let i = 0; i < this.enemies.length; i++) {
            if (
              bullet.x + bullet.width > this.enemies[i].x &&
              bullet.x < this.enemies[i].x + this.enemies[i].width &&
              bullet.y + bullet.height > this.enemies[i].y &&
              bullet.y < this.enemies[i].y + this.enemies[i].height
            ) {
              this.enemies[i].state = 'dead';
              this.bullets.splice(bullet, 1);
              this.score += 1;
            }
          }
        }
      }

      for (let enemy of this.enemies) {
        enemy.runLogic();
        if (enemy.x < -200 || enemy.y > 900) {
          this.enemies.splice(enemy, 1);
        }

        const intersectingWithPlayer = enemy.checkIntersection(this.player);

        if (intersectingWithPlayer) {
          this.healthbar.health--;
          enemy.state = 'dead';
        }
      }
    }
    clean() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    paint() {
      this.background.paint();
      this.player.paint();
      this.scoreBoard.paint();
      this.healthbar.paint();

      if (this.bullets.length > 0) {
        for (let bullet of this.bullets) {
          bullet.paint();
        }
      }

      for (let enemy of this.enemies) {
        enemy.paint();
      }
    }

    loop() {
      this.runLogic();
      this.clean();
      this.paint();

      setTimeout(() => {
        this.loop();
      }, 1000 / 40);
    }
  }

  class Enemies {
    constructor(x, y, game) {
      this.explosionImg = new Image();
      this.explosionImg.src = '/images/enemy/explosion.png';
      this.enemyImg = new Image();
      this.enemyImg.src = '/images/enemy/viper.gif';
      this.y = y;
      this.x = x;
      this.width = 200;
      this.state = 'alive';
      this.height = 200;
      this.game = game;
      this.player = this.game.player;
      this.reasonable = 100;
      this.speed = 10;
    }

    checkIntersection(player) {
      return (
        player.x + player.width - this.reasonable > this.x &&
        player.x < this.x + this.width - this.reasonable &&
        player.y + player.height - this.reasonable > this.y &&
        player.y < this.y + this.height - this.reasonable
      );
    }
    runLogic() {
      this.x -= this.speed;
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

    paint() {
      const context = this.game.context;
      console.log(this.health);
      let currentHealth = this.health;

      switch (currentHealth) {
        case 3:
          console.log('hello');
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
      context.font = '30px sans-serif';
      context.fillText('H E A L T H', 40, 45);
      context.restore();
      context.drawImage(currentHealth, 30, 60, 180, 40);
    }
  }
};

//let timestamp

//let shoothing timestap = timepstap - iff difference has pased
//if shooting is true and 2 seconds have passed
