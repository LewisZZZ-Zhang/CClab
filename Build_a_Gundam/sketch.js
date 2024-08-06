let boxImage, boxOpenedImage;
let boxX, boxY;
let dragging = false;
let offsetX, offsetY;
let scaleFactor = 0.5; // Adjust this factor to resize the images while keeping the same ratio

function preload() {
    boxImage = loadImage('assets/Box.png');
    boxOpenedImage = loadImage('assets/BoxOpened.png');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    boxX = width / 2;
    boxY = height * 2/3;
}

function draw() {
    background(0);
    imageMode(CENTER);
    image(boxOpenedImage, width / 2, height *2 /3, boxOpenedImage.width * scaleFactor, boxOpenedImage.height * scaleFactor);
    image(boxImage, boxX, boxY, boxImage.width * scaleFactor, boxImage.height * scaleFactor);
}

function mousePressed() {
    if (mouseX > boxX - (boxImage.width * scaleFactor) / 2 && mouseX < boxX + (boxImage.width * scaleFactor) / 2 &&
        mouseY > boxY - (boxImage.height * scaleFactor) / 2 && mouseY < boxY + (boxImage.height * scaleFactor) / 2) {
        dragging = true;
        offsetX = mouseX - boxX;
        offsetY = mouseY - boxY;
    }
}

function mouseDragged() {
    if (dragging) {
        boxX = mouseX - offsetX;
        boxY = mouseY - offsetY;
    }
}

function mouseReleased() {
    dragging = false;
}