window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.display = 'none';
    const canvasElement = document.getElementById('canvas');
    const canvasCSS = document.querySelector('.canvas-wrapper');
    canvasCSS.style.display = 'flex';
    const game = new Game(canvasElement);
    game.running = true;

    const savedValue = window.localStorage.getItem('High-Score');
    console.log(savedValue);

    game.background.highScore = savedValue;
    console.log(game.highScore);

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
      this.powerUps = [];
      this.powerUp = new Powerup(500, 500, this);
      this.createPowerUp();
      this.powerUpGiven = false;
      this.nooo = new Audio('/audio/nooooo.mp3');
      this.yodaSound = new Audio('/audio/helpyou.wav');
      this.healthSound = new Audio('/audio/health.mp3');
      this.blasterSound = new Audio('/audio/blaster.wav');
      this.explosion = new Audio('/audio/Explosion+1.wav');
      this.theme = new Audio('/audio/background.mp3');
    }

    lose() {
      this.nooo.play();
      this.running = false;
      const losingDiv = document.getElementById('loser');
      losingDiv.style.display = 'block';
      this.canvas.style.display = 'none';

      const result = document.getElementById('current-score');
      result.textContent = this.score;
      const highScoreHolder = document.getElementById('high-score');
      highScoreHolder.textContent = this.highScore;

      if (this.score > this.background.highScore) {
        this.background.highScore = this.score;
        window.localStorage.setItem('High-Score', this.score);

        highScoreHolder.textContent = this.background.highScore;
      } else {
        highScoreHolder.textContent = this.background.highScore;
      }

      document.getElementById('start-button2').onclick = () => {
        this.canvas.style.display = 'block';
        this.highScore = window.localStorage.getItem('High-Score');

        losingDiv.style.display = 'none';
        this.powerUps.length = 0;
        this.enemies.length = 0;
        this.score = 0;
        this.healthbar.health = 3;
        this.running = true;
        this.loop();
        this.createEnemy();
        this.player.x = 200;
        this.player.y = 600;
        this.theme.currentTime = 0;
        this.theme.play();
      };
    }

    createPowerUp() {
      let randomX = 50 + Math.random() * 900;
      let randomY = 50 + Math.random() * 600;
      let randomNum = Math.floor(Math.random() * 11);
      let purpose = 'health';
      if (
        this.score % 10 === 0 &&
        this.powerUps.length < 1 &&
        this.score !== 0 &&
        !this.powerUpGiven
      ) {
        if (randomNum % 2 === 0) {
          purpose = 'health';
          this.healthSound.volume = 0.2;
          this.healthSound.play();
        } else {
          purpose = 'points';
          this.yodaSound.volume = 1;
          this.yodaSound.play();
        }

        this.powerUpGiven = true;

        const powerUp = new Powerup(randomX, randomY, purpose, this);

        this.powerUps.push(powerUp);
      }
    }
    createEnemy() {
      //score with difficulty
      let limit = 1;
      limit += this.score;

      //left or right

      if (this.enemies.length < limit) {
        let randomHeight = Math.random() * 470;
        let direction = 'right';
        let origin = -200;
        let randomNumber = Math.floor(Math.random() * 11);

        if (randomNumber % 2 === 0) {
          origin = 1500;
          direction = 'left';
        } else {
          origin = -200;
          direction = 'right';
        }

        const enemy = new Enemies(origin, randomHeight, direction, this);

        this.enemies.push(enemy);
      }

      if (this.running) {
        setTimeout(() => {
          this.createEnemy();
        }, 1000);
      }
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
            this.blasterSound.play();
        }
      });
    }
    runLogic() {
      this.player.runLogic();
      this.healthbar.runLogic();
      if (this.running) {
        this.theme.volume = 0.5;
        this.theme.play();
      } else {
        this.theme.pause();
      }
      //bullet run logic
      if (this.bullets.length > 0) {
        for (let bullet of this.bullets) {
          bullet.runLogic();
          this.gunFired = true;
          if (bullet.x < -50 || bullet.x > 1400) {
            this.bullets.splice(bullet, 1);
          }

          //checking for bullet collision with enemy
          for (let i = 0; i < this.enemies.length; i++) {
            if (
              bullet.x + bullet.width > this.enemies[i].x &&
              bullet.x < this.enemies[i].x + this.enemies[i].width &&
              bullet.y + bullet.height > this.enemies[i].y &&
              bullet.y < this.enemies[i].y + this.enemies[i].height
            ) {
              this.explosion.play();

              this.enemies[i].state = 'dead';
              this.bullets.splice(bullet, 1);
              this.score += 1;
              this.createPowerUp();
            }
          }
        }
      }

      //check for intersection with bullet
      for (let enemy of this.enemies) {
        enemy.runLogic();
        if (enemy.x < -500 || enemy.x > 1600 || enemy.y > 1000) {
          this.enemies.splice(enemy, 1);
        }
        const intersectingWithPlayer = enemy.checkIntersection(this.player);

        if (intersectingWithPlayer) {
          this.explosion.play();
          this.healthbar.health--;
          enemy.state = 'dead';
        }
      }

      //check for powerups being picked up
      for (let powerUp of this.powerUps) {
        const powerUpPickedUp = powerUp.checkIntersection(this.player);
        if (powerUpPickedUp) {
          if (powerUp.purpose === 'points') {
            this.score += 5;
          } else if (powerUp.purpose === 'health') {
            //increments health or score depending on pick up
            if (this.healthbar.health < 3) {
              this.healthbar.health++;
            }
          }
          this.powerUpGiven = false; //makes it possible for powerups to be spawned
          this.powerUps.splice(powerUp, 1);
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

      for (let powerUp of this.powerUps) {
        powerUp.paint();
      }

      for (let enemy of this.enemies) {
        enemy.paint();
      }
    }

    loop() {
      this.runLogic();
      this.clean();
      this.paint();

      if (this.running) {
        setTimeout(() => {
          this.loop();
        }, 1000 / 40);
      }
    }
  }
};

//let timestamp

//let shoothing timestap = timepstap - iff difference has pased
//if shooting is true and 2 seconds have passed

//if score is greater than bla, start coming from left
//local storage high score
