class Shield {
    constructor(x, y) {
        this.part1 = {
            x: x - 200,
            y: y,
            w: part1Img.width / 3,
            h: part1Img.height / 3,
            dragging: false,
            img: part1Img,
            x_ass: 0,
            y_ass: 0,
        };
        this.part2 = {
            x: x,
            y: y, w: part2Img.width,
            w: part2Img.width / 3,
            h: part2Img.height / 3,
            dragging: false,
            img: part2Img,
            x_ass: -11,
            y_ass: -3,
        };
        this.part3 = {
            x: x + 200,
            y: y,
            w: part3Img.width / 3,
            h: part3Img.height / 3,
            dragging: false,
            img: part3Img,
            x_ass: -23,
            y_ass: -78,
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

        fill(0, 255, 0);
        noStroke();
        if (testing){
            ellipse(this.part1.x + this.part1.x_ass, this.part1.y + this.part1.y_ass, 10, 10);
            ellipse(this.part2.x + this.part2.x_ass, this.part2.y + this.part2.y_ass, 10, 10);
            ellipse(this.part3.x + this.part3.x_ass, this.part3.y + this.part3.y_ass, 10, 10);
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
        for (let i = this.parts.length - 1; i >= 0; i--) {
            let part = this.parts[i];
            if (part.dragging) {
                part.x = mouseX - part.offsetX;
                part.y = mouseY - part.offsetY;
                break;
            }
        }
    }

    mouseReleased() {
        for (let part of this.parts) {
            part.dragging = false;
        }
    }

    isComplete() {

        const dist1 = dist(this.part1.x + this.part1.x_ass, this.part1.y + this.part1.y_ass, this.part2.x + this.part2.x_ass, this.part2.y + this.part2.y_ass);
        const dist2 = dist(this.part2.x + this.part2.x_ass, this.part2.y + this.part2.y_ass, this.part3.x + this.part3.x_ass, this.part3.y + this.part3.y_ass);
        const dist3 = dist(this.part3.x + this.part3.x_ass, this.part3.y + this.part3.y_ass, this.part1.x + this.part1.x_ass, this.part1.y + this.part1.y_ass);
        return dist1 < mindist && dist2 < mindist && dist3 < mindist;
    }
}

let shield;
let part1Img, part2Img, part3Img, guideImg;
let imgX, imgY, imgWidth, imgHeight;
let isZoomed = false;
let mindist = 10
let testing = false;

function preload() {
    part1Img = loadImage('assets/sheild1.png', () => console.log('part1Img loaded'), () => console.error('Failed to load part1Img'));
    part2Img = loadImage('assets/sheild2.png', () => console.log('part2Img loaded'), () => console.error('Failed to load part2Img'));
    part3Img = loadImage('assets/sheild3.png', () => console.log('part3Img loaded'), () => console.error('Failed to load part3Img'));
    guideImg = loadImage('assets/guide.jpg', () => console.log('guidebook loaded'), () => console.error('Failed to load guidebook'));
}

function setup() {
    let cnv = createCanvas(windowWidth-100, windowHeight-100);
    cnv.parent('sketch-holder');
    shield = new Shield(width / 2, height / 2);
    imgWidth = 300;
    imgHeight = 300;
    imgX = 10;
    imgY = height / 2 - (width / 4 * imgHeight / imgWidth) / 2;
}

function back_ground() {
    background(220);
    noStroke();
    fill(0);
    rect(0, 0, width / 4, height);
    fill(0);
    rect(width / 4 * 3, 0, width, height);
    fill(255)
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Guide', width / 8, 50);

    text('Working Area', width / 2, 50);
    text('Sprues', width / 8 * 7, 50);
    textSize(16);
    text("(Click to enlarge it.)", width / 8, 80);

}

function draw() {
    back_ground()
    shield.display();
    if (shield.isComplete()) {
        fill(0, 255, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        // text('Shield Completed!', width / 2, height-50);
        let done = document.getElementById('done');
        done.style.display = 'block';
    }else{
        let done = document.getElementById('done');
        done.style.display = 'none';
    }
    if (isZoomed) {
        imageMode(CENTER);
        let aspectRatio = guideImg.width / guideImg.height;
        let newWidth = width;
        let newHeight = width / aspectRatio;
        if (newHeight > height) {
            newHeight = height;
            newWidth = height * aspectRatio;
        }
        image(guideImg, width / 2, height / 2, newWidth, newHeight);
    } else {
        imageMode(CORNER)
        image(guideImg, imgX, imgY, width / 4 - imgX * 2, width / 4 * imgHeight / imgWidth);
    }
}

function mousePressed() {
    // Check if the mouse is over the image
    if (!isZoomed && mouseX > imgX && mouseX < imgX + imgWidth && mouseY > imgY && mouseY < imgY + imgHeight) {
        isZoomed = true;
    } else if (isZoomed) {
        isZoomed = false;
    } else {
        shield.mousePressed();
    }
}

function mouseDragged() {
    shield.mouseDragged();
}

function mouseReleased() {
    shield.mouseReleased();
}