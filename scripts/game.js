window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.display = 'none';
    const canvasElement = document.getElementById('canvas');
    const game = new Game(canvasElement);
    game.running = true;

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
    }

    lose() {
      this.running = false;
      const losingDiv = document.getElementById('loser');
      losingDiv.style.display = 'block';
      this.canvas.style.display = 'none';

      const result = document.querySelector('div span');
      result.textContent = this.score;

      document.getElementById('start-button2').onclick = () => {
        location.reload();
      };
    }

    createPowerUp() {
      let randomX = 50 + Math.random() * 900;
      let randomY = 50 + Math.random() * 600;
      let randomNum = Math.floor(Math.random() * 11);
      let purpose = 'health';
      debugger;

      if (
        this.score % 10 === 0 &&
        this.powerUps.length < 1 &&
        this.score !== 0 &&
        !this.powerUpGiven
      ) {
        if (randomNum % 2 === 0) {
          purpose = 'health';
        } else {
          purpose = 'points';
        }

        this.powerUpGiven = true;

        const yoda = new Powerup(randomX, randomY, purpose, this);

        this.powerUps.push(yoda);
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
              this.createPowerUp();
            }
          }
        }
      }

      for (let enemy of this.enemies) {
        enemy.runLogic();
        if (enemy.x < -500 || enemy.x > 1600 || enemy.y > 1000) {
          this.enemies.splice(enemy, 1);
        }
        const intersectingWithPlayer = enemy.checkIntersection(this.player);

        if (intersectingWithPlayer) {
          this.healthbar.health--;
          enemy.state = 'dead';
        }
      }

      for (let yoda of this.powerUps) {
        const yodaPickedUp = yoda.checkIntersection(this.player);
        if (yodaPickedUp) {
          if (yoda.purpose === 'points') {
            this.score += 5;
          } else if (yoda.purpose === 'health') {
            if (this.healthbar.health < 3) {
              this.healthbar.health++;
            }
          }
          this.powerUpGiven = false;
          this.powerUps.splice(yoda, 1);
        }
        console.log(this.powerUpGiven);
      }

      this.healthbar.runLogic();
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

      for (let yoda of this.powerUps) {
        yoda.paint();
      }

      for (let enemy of this.enemies) {
        enemy.paint();
      }
    }

    loop() {
      this.runLogic();
      this.clean();
      this.paint();

      if (this.running === true) {
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

//save img in object
//if score is greater than bla, start coming from left
//local storage high score
