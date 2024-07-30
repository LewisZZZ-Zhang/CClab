let confettis = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set the text properties
  textSize(32);
  fill(255);
}

function draw() {
    background(0);
  
    // Add a new confetti particle at the center every frame
    confettis.push(new Confetti(width / 2, height / 2));
  
    for (let i = confettis.length - 1; i >= 0; i--) {
      confettis[i].update();
      confettis[i].display();
  
      // Remove confetti if it falls out of the canvas
      if (confettis[i].isOutOfCanvas()) {
        confettis.splice(i, 1);
      }
    }
  
    // Display the number of particles
    text(`Particles: ${confettis.length}`, 10, 30);
}
  
  class Confetti {
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
      this.size = random(2, 10);
      this.speedX = random(-4, 4);
      this.speedY = random(-8,-2);
      this.gravity = 0.1; // Gravity constant
    }
  
    update() {
      this.speedY += this.gravity; // Apply gravity to vertical speed
      this.x += this.speedX;
      this.y += this.speedY;
    }
  
    display() {
      push();
      translate(this.x, this.y);
      fill(255, 0, 0);
      noStroke();
      circle(0, 0, this.size);
      pop();
    }
  
    isOutOfCanvas() {
      return this.x < 0 || this.x > width || this.y > height;
    }
}