let cows = [];
let cowImage;

function preload() {
    cowImage = loadImage('asset/cow-poster.png');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    // Initialize multiple cows and add them to the array
    for (let i = 0; i < 5; i++) {
        let x = random(width);
        let y = random(height);
        cows.push(new Cow(x, y, cowImage));
    }
}

function draw() {
    background(0);
    fill(255);
    // Update and display each cow
    for (let cow of cows) {
        cow.update();
        cow.display();
    }
}

class Cow {
    constructor(x, y, photo) {
        this.x = x;
        this.y = y;
        this.photo = photo;
    }

    update() {
        this.x += random(-1, 5);
        this.y += random(-1, 5);
    }
    
    display() {
        push();
        translate(this.x, this.y);
        fill(255);
        let imgWidth = this.photo.width;
        let imgHeight = this.photo.height;
        image(this.photo, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        pop();
    }
}