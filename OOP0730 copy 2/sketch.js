let fireworks = [];
let particles = [];
const gravity = 0.16;
const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'magenta', 'white'];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-holder');
}

function mousePressed() {
  fireworks.push(new Firework(mouseX, height));
}

function draw() {
  background(0,0,0,50);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].isExploded) {
      fireworks.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (!particles[i].isAlive) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, xSpeed, ySpeed, pColor, size) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = pColor;
    this.size = size;
    this.isAlive = true;
  }

  update() {
    this.ySpeed += gravity;
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y > height) {
      this.isAlive = false;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-8, -15);
    this.color = random(colors);
    this.size = 10;
    this.isExploded = false;
  }

  update() {
    if (!this.isExploded) {
      this.ySpeed += gravity;
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.ySpeed >= 0) {
        this.explode();
      }
    }
  }

  display() {
    if (!this.isExploded) {
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, this.size);
    }
  }

  explode() {
    this.isExploded = true;
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(this.x, this.y, random(-10, 10), random(-10, 10), this.color, 5));
    }
  }
}