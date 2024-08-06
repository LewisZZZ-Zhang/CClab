let testing = false;

let shield;
let part1Img, part2Img, part3Img, guideImg;
let Sprue1, Sprue2, Sprue3, Sprue4;
let cut1, cut2, cut3
let imgX, imgY, imgWidth, imgHeight;
let isZoomed = false;
let mindist = 10;

let sprues = [];
let spruePositions = [];
let sprueSize = 130; // Initial size of the sprues
let zoomedSprue = null; // To keep track of the zoomed sprue
let spruenames = [["A1", "A2"], ["A3", "A4"], ["B1", "B2"], ["B3", "B4"]]

let wrongtime = -200;
let wrongpos = [0, 0];
let flagfound = 0;

let assembling;
let videocanplay = false

let cheerplayed = false
let videoplay = false

let fireworks = [];
let particles = [];
let gravity = 0.16;
let colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'magenta', 'white'];
let exploded = false

class Shield {
    constructor(x, y) {
        this.part1 = { // B2/5, white
            x: x - 150,
            y: y ,
            w: part1Img.width / 3,
            h: part1Img.height / 3,
            dragging: false,
            img: part1Img,
            x_ass: 86,
            y_ass: 69,
            sprue: 1,
            where: [471, 439, 511, 493],
            found: false,
        };
        this.part2 = {
            x: x + 150,
            y: y ,
            w: part2Img.width / 3,
            h: part2Img.height / 3,
            dragging: false,
            img: part2Img,
            x_ass: -86,
            y_ass: 69,
            sprue: 1,
            where: [757, 433, 800, 494],
            found: false,
        };
        this.part3 = {
            x: x ,
            y: y - 100,
            w: part3Img.width / 3,
            h: part3Img.height / 3,
            dragging: false,
            img: part3Img,
            x_ass: 1,
            y_ass: 96,
            sprue: 1,
            where: [480, 286, 506, 345],
            found: false,
        };
        this.part4 = {
            x: x ,
            y: y + 100,
            w: part4Img.width / 3,
            h: part4Img.height / 3,
            dragging: false,
            img: part4Img,
            x_ass: 0,
            y_ass: 0,
            sprue: 0,
            where: [0,0,0,0],
            found: true,
        };
        this.parts = [
            this.part1,
            this.part2,
            this.part3,
            this.part4
        ];
    }

    display() {
        // Draw part1
        imageMode(CENTER);
        if (this.part1.found) {
            image(this.part1.img, this.part1.x, this.part1.y, this.part1.w, this.part1.h);
        }

        // Draw part2
        if (this.part2.found) {
            image(this.part2.img, this.part2.x, this.part2.y, this.part2.w, this.part2.h);
        }

        // Draw part3
        if (this.part3.found) {
            image(this.part3.img, this.part3.x, this.part3.y, this.part3.w, this.part3.h);
        }

        // Draw part4
        if (this.part4.found) {
            image(this.part4.img, this.part4.x, this.part4.y, this.part4.w, this.part4.h);
        }

        noStroke();
        if (testing) {
            for (const part of this.parts) {
                fill(255, 0, 0);
                if (part.found) {
                    fill(0, 255, 0);
                }
                ellipse(part.x + part.x_ass, part.y + part.y_ass, 10, 10);
            }
        }
    }

    mousePressed() {
        for (let part of this.parts) {
            if (!videoplay &&!isZoomed && zoomedSprue == null && part.found && mouseX > part.x - part.w / 2 && mouseX < part.x + part.w / 2 && mouseY > part.y - part.h / 2 && mouseY < part.y + part.h / 2) {
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

        let isComplete = true;
        for (let i = 0; i < this.parts.length; i++) {
            const part1 = this.parts[i];
            const part2 = this.parts[(i + 1) % this.parts.length];
            const dist = Math.hypot(part1.x + part1.x_ass - part2.x - part2.x_ass, part1.y + part1.y_ass - part2.y - part2.y_ass);
            if (dist >= mindist) {
            isComplete = false;
            break;
            }
        }
        return isComplete;
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

function preload() {
    part1Img = loadImage('assets/body1.png', () => console.log('part1Img loaded'), () => console.error('Failed to load part1Img'));
    part2Img = loadImage('assets/body2.png', () => console.log('part2Img loaded'), () => console.error('Failed to load part2Img'));
    part3Img = loadImage('assets/body3.png', () => console.log('part3Img loaded'), () => console.error('Failed to load part3Img'));
    part4Img = loadImage('assets/body4.png', () => console.log('part4Img loaded'), () => console.error('Failed to load part4Img'));
    guideImg = loadImage('assets/guide.png', () => console.log('guidebook loaded'), () => console.error('Failed to load guidebook'));
    wrongsign = loadImage('assets/wrong.png', () => console.log('wrongsign loaded'), () => console.error('Failed to load wrongsign'));
    for (let i = 0; i < 4; i++) {
        sprues[i] = loadImage(`assets/sprue${i + 1}.png`);
    }
    cut1 = loadSound('assets/cut1.mp3', () => console.log('cut1 loaded'), () => console.error('Failed to load cut1'));
    cut2 = loadSound('assets/cut2.mp3', () => console.log('cut2 loaded'), () => console.error('Failed to load cut2'));
    cut3 = loadSound('assets/cut3.mp3', () => console.log('cut3 loaded'), () => console.error('Failed to load cut3'));

    sp1 = loadSound('assets/sp1.mp3', () => console.log('sp1 loaded'), () => console.error('Failed to load sp1'));
    sp2 = loadSound('assets/sp2.mp3', () => console.log('sp2 loaded'), () => console.error('Failed to load sp2'));
    sp3 = loadSound('assets/sp3.mp3', () => console.log('sp3 loaded'), () => console.error('Failed to load sp3'));

    cheerSound = loadSound('assets/cheer.mp3', () => console.log('cheerSound loaded'), () => console.error('Failed to load cheerSound'));

}

function setup() {
    let cnv = createCanvas(1280, 720);
    cnv.parent('sketch-holder');
    shield = new Shield(width / 2, height / 2);
    imgWidth = 300;
    imgHeight = 300;
    imgX = 10;
    imgY = height / 2 - (width / 4 * imgHeight / imgWidth) / 2;
    assembling = createVideo(['assets/testvideo.mov']);
    assembling.size(960,  540 );
    assembling.hide(); // Hide the default video controls


    for (let i = 0; i < 4; i++) {
        spruePositions[i] = {
            x: width / 8 * 7,
            y: 100 + i * (sprueSize + 20)
        };
    }
}

function back_ground() {
    rectMode(CORNER);
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
    text('Sprues', width / 8 * 7, 50);
    textSize(16);
    text("(Click to enlarge it.)", width / 8, 80);
    text("(Click to find the parts.)", width / 8 * 7, 80);

    for (let i = 0; i < sprues.length; i++) {
        imageMode(CORNER);
        image(sprues[i], spruePositions[i].x, spruePositions[i].y, sprueSize, sprueSize);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(spruenames[i][0] + " & " + spruenames[i][1], spruePositions[i].x - sprueSize / 2, spruePositions[i].y + sprueSize / 2);
    }
    fill(0);
    textSize(32);
    text('Working Area', width / 2, 50);
}

function draw() {
    back_ground()
    shield.display();
    if (shield.isComplete() || keyIsDown(71)) {
        // if (!cheerplayed) {
        //     cheerSound.setVolume(0.5);
        //     cheerSound.play();
        // }
        // cheerplayed = true;
        // videocanplay = true;
        fill(0, 255, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        if (!videoplay) {
            text('Done! Go to the next step', width / 2, height - 75);
        }
        let done = document.getElementById('done');
        done.style.display = 'block';
    } else {
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
    if (zoomedSprue !== null) {
        imageMode(CENTER);
        background(0, 0, 0, 150)
        image(sprues[zoomedSprue], width / 2, height / 2, 960, 720);
    }
    
    if (testing) {
        fill(255);
        textSize(16);
        textAlign(LEFT, TOP);
        text(`mouseX: ${Math.round(mouseX)}, mouseY: ${Math.round(mouseY)}`, 10, 10);
    }

    if (wrongtime <= 30 && wrongtime >= 0) {
        wrongtime++
        imageMode(CENTER);
        image(wrongsign, wrongpos[0], wrongpos[1], 100, 100);
    }

    if (shield.isComplete() && videocanplay && !videoplay) {
        rectMode(CENTER);
        fill(0, 0, 0, 150);
        rect(width / 2, height - 30, 300, 50);
        textSize(16);
        fill(255);
        textAlign(CENTER, CENTER);
        text('Click here to watch the assembling video', width / 2, height - 30);
        if (exploded ==  false) {
            exploded = 0
        }
        if (exploded <= 180) {
            createExplosion(0, height, -1);
            createExplosion(width, height, 1);
            exploded ++
        }

    }

    if (videoplay) {
        background(0, 0, 0, 200);
        imageMode(CENTER);
        image(assembling, width / 2, height / 2, 960, 540);
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        text('Click the video to play/pause', width / 2, height - 30);
    }

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

function mousePressed() {
    // Check if the mouse is over the image
    if (!isZoomed && mouseX > imgX && mouseX < imgX + imgWidth && mouseY > imgY && mouseY < imgY + imgHeight && zoomedSprue == null) {
        isZoomed = true;
    } else if (isZoomed) {
        isZoomed = false;
    } else {
        shield.mousePressed();
    }

    if (zoomedSprue !== null) {
        for (let part of shield.parts) {
            if (part.sprue == zoomedSprue + 1 && mouseX > part.where[0] && mouseX < part.where[2] && mouseY > part.where[1] && mouseY < part.where[3]) {
                part.found = true;
                flagfound = 1

                let randomSound = Math.floor(Math.random() * 3);
                if (randomSound === 0) {
                    cut1.play();
                } else if (randomSound === 1) {
                    cut2.play();
                } else {
                    cut3.play();
                }
            }
        }
        if (flagfound == 0 && mouseX > width / 2 - 480 && mouseX < width / 2 + 480) {
            wrongtime = 0
            wrongpos = [mouseX, mouseY]
        }
        flagfound = 0
    }

    for (let i = 0; i < spruePositions.length; i++) {
        let pos = spruePositions[i];
        if (mouseX > pos.x && mouseX < pos.x + sprueSize && mouseY > pos.y && mouseY < pos.y + sprueSize) {
            zoomedSprue = i;
            let randomSound = Math.floor(Math.random() * 3);
            if (randomSound === 0) {
                sp1.play();
            } else if (randomSound === 1) {
                sp2.play();
            } else {
                sp3.play();
            }

            break;
        } else {
            zoomedSprue = null;
        }
    }

    if (videocanplay && mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height - 55 && mouseY < height - 5) {
        imageMode(CENTER);
        image(assembling, width / 2, height / 2, 960, 540);
        videoplay = true
    }

    if (videoplay) {
        if (mouseX > width / 2 - 320 && mouseX < width / 2 + 320 && mouseY > height / 2 - 240 && mouseY < height / 2 + 240) {
            if (assembling.elt.paused) {
                assembling.play(); // Play the video on mouse press
            } else {
                assembling.pause(); // Pause the video if it's playing
            }
        }
    }

}

function mouseDragged() {
    shield.mouseDragged();
}

function mouseReleased() {
    shield.mouseReleased();
}

function createExplosion(x, y, a) {
    let numParticles = 15;
    for (let i = 0; i < numParticles; i++) {
        let angle = random(PI, PI * 3/2);
        let speed = random(10, 15);
        let xSpeed = a * cos(angle) * speed;
        let ySpeed = sin(angle) * speed;
        let pColor = random(colors);
        let size = random(10, 15);
        particles.push(new Particle(x, y, xSpeed, ySpeed, pColor, size));
    }
}