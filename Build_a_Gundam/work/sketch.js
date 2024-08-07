let imageList = [];
let showpic = 75;
let lastMouseX = 0;
let guidecolor = [255, 255, 0]; // Example color
let gap = -0.5; // Example gap value

function preload() {
    for (let i = 0; i <= 159; i+=1) {
        let imageName = `testvideo${i.toString().padStart(3, '0')}.jpg`;
        let imagePath = `assets/spin1/${imageName}`;
        let img = loadImage(imagePath);
        imageList.push(img);
    }
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    lastMouseX = mouseX;
}

function mousePressed() {
    lastMouseX = mouseX; // Update lastMouseX when the mouse is pressed
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    fill(255);
    imageMode(CENTER);
    noStroke()
    image(imageList[showpic], width / 2, height / 2, height / imageList[showpic].height * imageList[showpic].width-50, height-50);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10) * 0.5 + 0.5));
    rect(width / 3, height / 2 - 40, 20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap) * 0.5 + 0.5));
    rect(width / 3 - 40, height / 2 - 40, 20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 2) * 0.5 + 0.5));
    rect(width / 3 - 80, height / 2 - 40, 20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 3) * 0.5 + 0.5));
    rect(width / 3 - 120, height / 2 - 40, 20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 4) * 0.5 + 0.5));
    triangle(width / 3 - 140, height / 2 - 40, width / 3 - 160, height / 2, width / 3 - 140, height / 2 + 40);

    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10) * 0.5 + 0.5));
    rect(width * 2 / 3, height / 2 - 40, -20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap) * 0.5 + 0.5));
    rect(width * 2 / 3 + 40, height / 2 - 40, -20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 2) * 0.5 + 0.5));
    rect(width * 2 / 3 + 80, height / 2 - 40, -20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 3) * 0.5 + 0.5));
    rect(width * 2 / 3 + 120, height / 2 - 40, -20, 80);
    fill(guidecolor[0], guidecolor[1], guidecolor[2], 255 * (sin(frameCount * 0.10 + gap * 4) * 0.5 + 0.5));
    triangle(width * 2 / 3 + 140, height / 2 - 40, width * 2 / 3 + 160, height / 2, width * 2 / 3 + 140, height / 2 + 40);

    let button = createButton('Go back to the start page');
    button.position(windowWidth - 300, windowHeight - 70);
    button.style('font-size', '20px');
    button.style('padding', '10px 20px');
    button.style('width', '280px');
    button.mousePressed(() => {
        window.open('../index.html', '_blank');
    });
}

function mouseDragged() {
    let deltaX = mouseX - lastMouseX;
    if (deltaX > 0) {
        indexChange = Math.floor(deltaX / 10); // Adjust the divisor to control sensitivity
    } else {
        indexChange = Math.ceil(deltaX / 10); // Adjust the divisor to control sensitivity
    }

    if (indexChange !== 0) {
        showpic = (showpic + indexChange + imageList.length) % imageList.length;
        lastMouseX = mouseX; // Update lastMouseX only if there is a change
    }
}