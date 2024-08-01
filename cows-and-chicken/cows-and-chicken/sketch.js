let cowImg, chickenImg;
let animals = []; // Define animals array in the global scope

function preload() {
    cowImg = loadImage('assets/cow-poster.png');
    chickenImg = loadImage('assets/chicken_480.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 5; i++) {
        let animalType = random(['cow', 'chicken']);
        let img = animalType === 'cow' ? cowImg : chickenImg;
        animals.push(new Animal(random(width), random(height / 2), img));
    }
}

function draw() {
    background(255);

    // Loop over the animals array
    for (let i = 0; i < animals.length; i++) {
        animals[i].display();
        animals[i].update();
    }

    line(0, height / 2, width, height / 2);
    line(width / 2, height / 2, width / 2, height);
}

function mousePressed() {
    for (let i = 0; i < animals.length; i++) {
        animals[i].pressed();
    }
}

function mouseReleased() {
    for (let i = 0; i < animals.length; i++) {
        animals[i].released();
    }
}

class Animal {
    constructor(startX, startY, img) {
        this.x = startX;
        this.y = startY;
        this.photo = img;
        this.scaleFactor = random(0.4, 0.5);

        this.xSpeed = 1;
        this.ySpeed = 1;

        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    display() {
        image(this.photo, this.x, this.y, this.photo.width * this.scaleFactor, this.photo.height * this.scaleFactor);
    }

    pressed() {
        let d = dist(mouseX, mouseY, this.x + 1/2 *this.photo.width * this.scaleFactor, this.y + 1/2 * this.photo.height * this.scaleFactor);
        if (d < this.photo.width * this.scaleFactor) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        this.dragging = false;
    }
}