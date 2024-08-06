let fireworks = [];
let particles = [];
const gravity = 0.16;
const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'magenta', 'white'];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-holder');
}

function mousePressed() {
  createExplosion(mouseX, mouseY);
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

function createExplosion(x, y) {
  let numParticles = 100;
  for (let i = 0; i < numParticles; i++) {
    let angle = random(PI, TWO_PI);
    let speed = random(2, 15);
    let xSpeed = cos(angle) * speed;
    let ySpeed = sin(angle) * speed;
    let pColor = random(colors);
    let size = random(5, 10);
    particles.push(new Particle(x, y, xSpeed, ySpeed, pColor, size));
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
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += gravity;
    this.size *= 0.95; // Shrink over time
    if (this.size < 0.5) {
      this.isAlive = false;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}