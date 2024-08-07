let boxImage, boxOpenedImage;
let boxX, boxY;
let dragging = false;
let offsetX, offsetY;
let scaleFactor = 0.5; // Adjust this factor to resize the images while keeping the same ratio
let i = 1;
let k;
let gap = -1; // 90 degrees in radians
let guidecolor = [255, 255, 255]
let stars = [];
let text1, text2;

function preload() {
    boxImage = loadImage('assets/Box.png');
    boxOpenedImage = loadImage('assets/BoxOpened.png');
    text1 = loadImage('assets/text1.png');
    text2 = loadImage('assets/text2.png');
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    boxX = width / 2;
    boxY = height * 3 / 4;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    boxX = width / 2;
    boxY = height * 3 / 4;
}

function push_stars() {
    for (let i = 0; i < 300; i++) {
        stars.push([
            0, //x
            0, //y
            random(0, 2 * PI), //angle
            random(10, 20), //speed
            random(1, 100), // wait time till it starts moving
            random(100, 300)// starting raduis
        ]);
    }
}

function move_stars() {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        if (star[4] > 0) {
            star[4]--;
        } else {
            star[0] += cos(star[2]) * star[3];
            star[1] += sin(star[2]) * star[3];
        }
    }
}


function draw_stars() {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        noStroke()
        fill(255, 255, 255);
        ellipse(width / 2 +star[5]*cos(star[2])+ star[0], height / 2 +star[5]*sin(star[2])+star[1], dist(width / 2, height / 2, width / 2 + star[0], height / 2 + star[1]) / 100, dist(width / 2, height / 2, width / 2 + star[0], height / 2 + star[1]) / 100);
    }
}


function draw() {
    if (i == 1) {
        background(0);
    } else {
        background(0, 0, 100 - 100 * i, 200);
    }
    imageMode(CENTER);
    rectMode(CENTER);

    draw_stars();
    move_stars();

    if (i == 1) {
        fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10) * 0.5 + 0.5));
        rect(width / 2, height / 2, 80, 20);
        fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap) * 0.5 + 0.5));
        rect(width / 2, height / 2 - 60, 80, 20);
        fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 2) * 0.5 + 0.5));
        rect(width / 2, height / 2 - 120, 80, 20);
        fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 3) * 0.5 + 0.5));
        rect(width / 2, height / 2 - 180, 80, 20);
        fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 4) * 0.5 + 0.5));
        triangle(width / 2 - 40, height / 2 - 230, width / 2 + 40, height / 2 - 230, width / 2, height / 2 - 260);
    }

    // fill(255, 255, 255, 255 * i);
    // textSize(100);
    // textFont('Arial Narrow');
    // textAlign(CENTER);
    // text("Do you want to", width / 4 - 100, height / 2 - 100);
    // text("build a Gundam", width / 4 - 100, height / 2 + 100);
    // textAlign(CENTER);
    // text("As if you are", width / 4 * 3 + 100, height / 2 - 100);
    // text("in 2024?", width / 4 * 3 + 100, height / 2 + 100);

    tint(255, 255 * i);
    image(text2, width / 2 -text2.width/2 -70 + 500*(i-1) , height / 2, text1.width, text1.height);

    // Draw text2 on the right side with transparency
    tint(255, 255 * i);
    image(text1, width / 2 + text1.width/2 + 70 -500*(i-1) , height / 2, text1.width, text1.height);

    if (boxY < 0) {
        boxY = 0;
    } else if (boxY > 3 / 4 * height) {
        boxY = 3 / 4 * height
    }


    if (boxX < width / 2 - 100) {
        boxX = width / 2 - 100;
    } else if (boxX > width / 2 + 100) {
        boxX = width / 2 + 100;
    }


    image(boxOpenedImage, width / 2, height * 3 / 4, boxOpenedImage.width * scaleFactor * (1.5 - i) * 2, boxOpenedImage.height * scaleFactor * (1.5 - i) * 2);

    if (!dragging && boxY < height / 2 && i >= 0) {
        image(boxImage, boxX, boxY, boxImage.width * scaleFactor * i, boxImage.height * scaleFactor * i);
        i -= 0.02;
        if (stars.length < 100) {
            push_stars();
        }
    } else if (i <= 0) {
        window.location.href = "/Build_a_Gundam_shield/"; // Redirect to another webpage
    } else {
        image(boxImage, boxX, boxY, boxImage.width * scaleFactor * i, boxImage.height * scaleFactor * i);
    }

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