let part1Img, part2Img, part3Img;

class Shield {
    constructor(x, y) {
        this.part1 = { 
            x: x, 
            y: y, 
            w: part1Img.width, 
            h: part1Img.height, 
            dragging: false, 
            img: part1Img,
            x_ass: x,
            y_ass: y,
        };
        this.part2 = { 
            x: x + part1Img.width, 
            y: y, w: part2Img.width, 
            w: part2Img.width,
            h: part2Img.height, 
            dragging: false, 
            img: part2Img,
            x_ass: x-10,
            y_ass: y,
        };
        this.part3 = { 
            x: x + part1Img.width + part2Img.width, 
            y: y, 
            w: part3Img.width, 
            h: part3Img.height, 
            dragging: false, 
            img: part3Img,
            x_ass: x-30,
            y_ass: y,
        };
        this.parts = [
            this.part1, 
            this.part2, 
            this.part3
        ];
    }

    display() {
        // Draw part1
        imageMode(CENTER);
        image(this.part1.img, this.part1.x, this.part1.y, this.part1.w, this.part1.h);

        // Draw part2
        image(this.part2.img, this.part2.x, this.part2.y, this.part2.w, this.part2.h);

        // Draw part3
        image(this.part3.img, this.part3.x, this.part3.y, this.part3.w, this.part3.h);
    
        fill(0 , 255, 0);
        noStroke();
        for (let part of this.parts) {
            ellipse(part.x, part.y, 10, 10);
        }
    }

    mousePressed() {
        for (let part of this.parts) {
            if (mouseX > part.x - part.w / 2 && mouseX < part.x + part.w / 2 && mouseY > part.y - part.h / 2 && mouseY < part.y + part.h / 2) {
                part.dragging = true;
                part.offsetX = mouseX - part.x;
                part.offsetY = mouseY - part.y;
            }
        }
    }

    mouseDragged() {
        for (let part of this.parts) {
            if (part.dragging) {
                part.x = mouseX - part.offsetX;
                part.y = mouseY - part.offsetY;
                
            }
        }
    }

    mouseReleased() {
        for (let part of this.parts) {
            part.dragging = false;
        }
    }

    isComplete() {
        const dist1 = dist(this.part1.x, this.part1.y, this.part2.x, this.part2.y);
        const dist2 = dist(this.part2.x, this.part2.y, this.part3.x, this.part3.y);
        const dist3 = dist(this.part3.x, this.part3.y, this.part1.x, this.part1.y);
        return dist1 < 20 && dist2 < 20 && dist3 < 20;
    }
}

let shield;

function preload() {
    part1Img = loadImage('assets/sheild1.png', () => console.log('part1Img loaded'), () => console.error('Failed to load part1Img'));
    part2Img = loadImage('assets/sheild2.png', () => console.log('part2Img loaded'), () => console.error('Failed to load part2Img'));
    part3Img = loadImage('assets/sheild3.png', () => console.log('part3Img loaded'), () => console.error('Failed to load part3Img'));
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    shield = new Shield(width/2 -200, height/2);
}

function draw() {
    background(220);
    shield.display();
    if (shield.isComplete()) {
        fill(0, 255, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Shield Complete!', width / 2, height / 2);
    }
}

function mousePressed() {
    shield.mousePressed();
}

function mouseDragged() {
    shield.mouseDragged();
}

function mouseReleased() {
    shield.mouseReleased();
}