const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const GRAVITY = 0.15;
const MAX_JUMP_VELOCITY = -8

class Player {
  constructor(position) {
    this.height = 50;
    this.width = 50;
    this.canJump = true;
    this.position = position;
    this.velocity = {
      y: 0,
    }
  }

  // Creates character
  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    // Movement
    this.position.y += this.velocity.y;

    // Enemy collision
    if (
      this.position.x < enemy.position.x + enemy.width &&
      this.position.x + this.width > enemy.position.x &&
      this.position.y < enemy.position.y + enemy.height &&
      this.position.y + this.height > enemy.position.y
    ) {
      // game over
      console.log("Collision with enemy!");
    }

    // gravity
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += GRAVITY;
    } else {
      this.velocity.y = 0;
    }

    // Jump debounce
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.canJump = true;
    }
  }
}

class Enemy {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.position = {
      x: canvas.width - this.width,
      y: canvas.height - this.height,
    };
    this.velocity = {
      x: 2,
    }
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    // Movement
    this.position.x -= this.velocity.x;
  }

}

const player = new Player({
  x: 100,
  y: 0,
});

const enemy = new Enemy();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  enemy.update();
  player.update();
}

animate();

window.addEventListener('keydown', (event) => {
  if (event.key === ' ' && player.canJump) {
    player.velocity.y = MAX_JUMP_VELOCITY;
    player.canJump = false;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === ' ' && player.velocity.y < 0) {
    player.velocity.y = 0;
  }
});