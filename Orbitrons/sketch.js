let stars = [];
let satellites = [];
let missiles = [];
let hp = 100;
let explode = []
let g = 1.1

function halo(x, y, d, r, g, b, t) {
  noStroke();
  fill(r, g, b, 2 * t);
  for (let i = 0; i <= 255; i++) {
    circle(x, y, (d / 256) * i);
  }
}

function sun(x, y) {
  noFill();
  stroke(230, 230, 230, 100);
  strokeWeight(1);
  ellipse(x, y, 200, 100);
  ellipse(x, y, 100, 50);
  ellipse(x, y, 250, 125);
  noStroke();
  fill("#FF7000");
  circle(x, y, 25);
  halo(x, y, 75, 255, 255, 0, 0.5);
  fill("#00AAFF");
  circle(
    x + 100 * cos((PI / 45) * frameCount * 0.3),
    y + 50 * sin((PI / 45) * frameCount * 0.3),
    10
  );
  fill("#008621");
  circle(
    x + 50 * cos((PI / 45) * frameCount * 0.5),
    y + 25 * sin((PI / 45) * frameCount * 0.5),
    14
  );
  fill("#1C00B8");
  circle(
    x + 125 * cos((PI / 45) * frameCount * 0.2),
    y + (125 / 2) * sin((PI / 45) * frameCount * 0.2),
    14
  );
}

function reset_satellite() {
  return [
    random(-(PI * 3) / 4, (PI * 3) / 4), //starting angle
    random(520, 900), //starting radius
    (random(2, 6) * PI) / 1600, //rotating speed
    random(15, 20),
    random(10, 30),
  ];
}

function reset_stars() {
  return [
    random(width, 2 * width),
    random(-0.1 * height, 1.1 * height),
    random(5, 10),
  ];
}

function setup() {
  // createCanvas(800, 500);
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  centerX = width / 2;
  centerY = height + 400;
  creatureX = width / 8;
  creatureY = height / 2;
  for (let i = 0; i <= 100; i++) {
    stars.push(reset_stars());
  }
  for (let i = 0; i < 13; i++) {
    //The numbers of the space debris #13
    satellites.push(reset_satellite());
  }
}

function draw_satellite(x, y, r, rectLength, rectWidth) {
  push();
  translate(x, y); 
  noStroke();
  fill(200);
  circle(0, 0, r);
  rotate(radians(frameCount));
  rectMode(CENTER);
  fill("blue");
  rect(0, -r / 2 - rectLength / 2, rectWidth, rectLength);
  rotate(PI);
  rect(0, -r / 2 - rectLength / 2, rectWidth, rectLength);
  pop();
}

function draw_creature(x,y,a,b){
  cycle = sin((PI / 45) * frameCount);
  noStroke();
  fill(200);
    // Body
  rect(x - a / 2, y, a, b);
  triangle(
    x - a / 2,
    y + b,
    x - a - a / 2,
    y + b,
    x - a / 2 + 0.125 * a * (cycle + 1),
    y - b + 0.25 * a * (cycle + 1)
  );
  triangle(
    x + a - a / 2,
    y + b,
    x + 2 * a - a / 2,
    y + b,
    x + a / 2 - 0.125 * a * (cycle + 1),
    y - b + 0.25 * a * (cycle + 1)
  );
  
  if (frameCount > 250) {
    // Wing left
    triangle(
      x - a,
      y + (1 / 2) * b,
      x - 2 * a,
      y,
      x - 2 * a + 0.25 * a * (cycle + 1),
      y - b
    );
    triangle(
      x - 2 * a,
      y,
      x - 2 * a + 0.25 * a * (cycle + 1),
      y - b,
      x - 3.5 * a - 0.5 * a * (cycle + 1),
      y + (3 / 2) * b - 0.75 * b * (cycle + 1)
    );
    triangle(
      x - 2 * a + 0.25 * a * (cycle + 1),
      y - b,
      x - 2 * a,
      y - (1 / 2) * b,
      x - 3 * a,
      y - 0.75 * a * (cycle + 1)
    );
    // Wing right
    triangle(
      x + a,
      y + (1 / 2) * b,
      x + 2 * a,
      y,
      x + 2 * a - 0.25 * a * (cycle + 1),
      y - b
    );
    triangle(
      x + 2 * a,
      y,
      x + 2 * a - 0.25 * a * (cycle + 1),
      y - b,
      x + 3.5 * a + 0.5 * a * (cycle + 1),
      y + (3 / 2) * b - 0.75 * b * (cycle + 1)
    );
    triangle(
      x + 2 * a - 0.25 * a * (cycle + 1),
      y - b,
      x + 2 * a,
      y - (1 / 2) * b,
      x + 3 * a,
      y - 0.75 * a * (cycle + 1)
    );
  }
  
}

function creature(x, y, a, b) {
  rectMode(CORNER);
  if (frameCount % 800 > 0 && frameCount % 800 < 400 && frameCount > 400) {
    halo(x, y, 50, 0, 255, 0, 1);
  }
  if (frameCount>225){
    [avoidx,avoidy] =findClosestToCreature(x, y, satellites, missiles, mouseX, mouseY);
    speedx = 100/(avoidx-x)
    speedy = 100/(avoidy-y)
    if (speedx>1){
      speedx = 1
    }
    else if (speedx<-1){
      speedx = -1
    }
    if (speedy>10){
      speedy = 10
    }
    else if (speedy<-10){
      speedy = -10
    }
    x = x - speedx;    
    y = y - speedy;
    if (x < 100) {
      x = 100;
    }
    else if (x > 230) {
      x = 230;
    }
    if (y < 150) {
      y = 150;
    }
    else if (y > 330) {
      y = 330;
    }
  }
  draw_creature(x,y,a,b)
  return [x,y]; // Return the current position
}

function findClosestToCreature(creatureX, creatureY, satellites, missiles, mouseX, mouseY) {
  let minDistance = Infinity;
  let closestObject = [0, height];
  // check satellites
  for (let i = 0; i < satellites.length; i++) {
    let satX = centerX + satellites[i][1] * sin(satellites[i][0]);
    let satY = centerY + satellites[i][1] * cos(satellites[i][0]);
    let distance = dist(creatureX, creatureY, satX, satY);
    if (distance < minDistance) {
      minDistance = distance;
      closestObject = [satX, satY];
    }
  }
  // check mouse
  let distanceToMouse = dist(creatureX, creatureY, mouseX, mouseY);
  if (distanceToMouse < minDistance) {
    closestObject = [mouseX, mouseY];
  }
  if (closestObject[0]>width||closestObject[1]>height){
    closestObject = [- width*1, height *2];
  }
  return closestObject;
}

function shooting_stars(stars) {
  for (let i = 0; i < stars.length; i++) {
    noStroke();
    fill(255);
    circle(stars[i][0], stars[i][1], 3);
    stars[i][0] = stars[i][0] - stars[i][2];
    if (stars[i][0] < 0 && frameCount % 800 > 400 && frameCount % 800 < 800) {
      stars[i] = reset_stars();
    }
  }
  return stars;
}

function shooting_satellites(satellites) {
  for (let i = 0; i < satellites.length; i++) {
    noStroke();
    fill(255);
    draw_satellite(
      centerX + satellites[i][1] * sin(satellites[i][0]),
      centerY + satellites[i][1] * cos(satellites[i][0]),
      satellites[i][3],
      satellites[i][4],
      40 - satellites[i][4]
    );
    if (frameCount > 200) {
      satellites[i][0] = satellites[i][0] + satellites[i][2];
    }
    if (satellites[i][0] > (PI * 5) / 4) {
      satellites[i] = reset_satellite();
    }
  }
  return satellites;
}

function aim(x, y) {
  if (frameCount>225){
    let r = 25;
    stroke(255, 0, 0, 100);
    strokeWeight(3);
    line(x, y, centerX, centerY);
    noFill();
    stroke(255, 0, 0, 200);
    circle(mouseX, mouseY, 2 * r);
    line(mouseX - (1 / 2) * r, mouseY, mouseX - r, mouseY);
    line(mouseX, mouseY - (1 / 2) * r, mouseX, mouseY - r);
    line(mouseX, mouseY + (1 / 2) * r, mouseX, mouseY + r);
    line(mouseX + (1 / 2) * r, mouseY, mouseX + r, mouseY);}
}

function missile() {
  for (let i = 0; i < missiles.length; i++) {
    let m = missiles[i];
    let dx = m.targetX - m.x;
    let dy = m.targetY - m.y;
    let angle = atan2(dy, dx); // angle towards target
    // to draw missile:
    push();
    translate(m.x, m.y);
    rotate(angle + (PI * 3) / 2); // Rotate towards target, it should be 3/2 pi
    strokeWeight(1)
    stroke(255, 0, 0);
    fill("#FFFCD7");
    rectMode(CENTER);
    rect(0, 0, 15, 30);
    beginShape();
    vertex(-7.5, 30);
    vertex(7.5, 30);
    vertex(0, 60);
    endShape(CLOSE);
    pop();

    let distToTarget = sqrt(dx * dx + dy * dy);
    let speed = 10;
    m.x += (dx / distToTarget) * speed;
    m.y += (dy / distToTarget) * speed;

    //when it reach the mouse, delete it 
    if (dist(m.x, m.y, m.targetX, m.targetY) < 5) {
      missiles.splice(i, 1);
    }
  }
  
}

function draw_sun() {
  sun(
    centerX + 1200 * sin((frameCount * PI) / 400 + (PI * 1) / 4),
    centerY + 200 + 800 * cos((frameCount * PI) / 400 + (PI * 1) / 4)
  );
}

function showHP(x, y, hp) {
  rectMode(CORNER);
  noStroke();
  fill(0);
  rect(x - 55, y - 15, 110, 30);
  if (hp > 50) {
    fill(255, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  if (frameCount % 800 > 0 && frameCount % 800 < 400) {
    fill(0, 255, 0);
  }
  rect(x - 50, y - 10, hp, 20);
  if (frameCount % 800 > 0 && frameCount % 800 < 400) {  
    textAlign(CENTER, CENTER)
    textSize(12)
    fill(255)
    text("HEALING",x,y)}
}

function explosion(x,y){
  for (let i = 0;i<20;i++){
    explode.push([x,y,x,y,random(0,2*PI),3])
  }
}

function update_ex(list){
  for (let i = 0;i<list.length;i++){
    list[i][0] += list[i][5]*cos(list[i][4])
    list[i][1] += list[i][5]*sin(list[i][4])+g
    if (dist(list[i][0],list[i][1],list[i][2],list[i][3])>600){
      list.splice(i, 1)
    }
  }
  return list
}

function draw_ex(list){
  for (let i = 0;i<list.length;i++){
    noStroke()
    fill(255,0,0,400-dist(list[i][0],list[i][1],list[i][2],list[i][3]))
    rect(list[i][0],list[i][1],5,5)
  }
  
}

function mousePressed() {
  // Launch a missile towards the mouse position
  if(frameCount>270){
    missiles.push({ x: centerX, y: height, targetX: mouseX, targetY: mouseY });}
}

function draw() {
  if (225<frameCount && frameCount<400){
    textAlign(CENTER, CENTER)
    textSize(20)
    fill(200)
    text("Click to save the Orbitron", width / 2, height / 2-20);
    text("It heals in sunlight",width / 2, height / 2);
    text("Don't shoot this creature.",width / 2, height / 2+20)
  }

  background(0, 0, 50 + 50 * sin((frameCount * PI) / 400), 50);
  if (frameCount < 225) {
    for (let i = 0; i < 3; i++) {
      creature(
        creatureX - 225 + frameCount - 50 + 50 * i,
        creatureY + 225 - frameCount - 70 + 70 * i,
        10,
        10
      );
    }
    draw_satellite(centerX+631*sin(0.4070+PI-(225-frameCount)/50),
                   centerY+631*cos(0.4070+PI-(225-frameCount)/50),
                   20,30,10)
    draw_satellite(centerX+801*sin(0.4525+PI-(225-frameCount)/70),
                   centerY+801*cos(0.4525+PI-(225-frameCount)/70),
                   20,30,10)
  }else if (frameCount==225) {
    explosion(creatureX+50,creatureY+70)
    explosion(creatureX-50,creatureY-70)
    background(255,0,0,200)
    hp -= 50
  
  }else {
    [creatureX,creatureY] = creature(creatureX, creatureY, 10, 10)
  }
  stars = shooting_stars(stars);
  satellites = shooting_satellites(satellites);
  noStroke();
  fill("#66ccff");
  circle(centerX, centerY, 900);
  halo(centerX, centerY, 1000, 255, 255, 255, 1);

  aim(mouseX, mouseY, centerX, centerY);
  missile(); 
  draw_sun();
  for (let i = missiles.length - 1; i >= 0; i--) {
    let m = missiles[i];
    for (let j = satellites.length - 1; j >= 0; j--) {
      let sat = satellites[j];
      let distToSatellite = dist(
        m.x,
        m.y,
        centerX + sat[1] * sin(sat[0]),
        centerY + sat[1] * cos(sat[0])
      );
      if (distToSatellite < 30) {
        // deltet missile and satellite
        let sat = satellites[j];
        let satelliteX = centerX + sat[1] * sin(sat[0]);
        let satelliteY = centerY + sat[1] * cos(sat[0]);
        fill(255, 0, 0, 100);
        stroke(255, 0, 0, 200);
        background(255, 100, 0, 100);
        circle(satelliteX, satelliteY, 100);
        missiles.splice(i, 1);
        satellites.splice(j, 1);
        explosion(satelliteX,satelliteY)
        break;
      }
    }
  }
  for (let i = missiles.length - 1; i >= 0; i--) {
    let m = missiles[i];
    let distToCreature = dist(m.x, m.y, creatureX, creatureY);
    if (distToCreature < 50) {
      // if Missile hit the creature
      textSize(32);
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      //text("Creature Died from Missile!", width / 2, height / 2);
      hp -= 50;
      missiles.splice(i, 1);
      explosion(m.x,m.y)
    }
  }

  for (let j = satellites.length - 1; j >= 0; j--) {
    let sat = satellites[j];
    let satelliteX = centerX + sat[1] * sin(sat[0]);
    let satelliteY = centerY + sat[1] * cos(sat[0]);
    let distToCreature = dist(satelliteX, satelliteY, creatureX, creatureY);
    if (distToCreature < 50) {
      // if Satellite hit the creature
      textSize(32);
      fill(255, 0, 0);
      hp -= 30;
      textAlign(CENTER, CENTER);
      //text("Creature Died!", width / 2, height / 2);
      satellites.splice(j, 1);
      explosion(satelliteX,satelliteY)
    }
  }
  
  draw_ex(explode)
  update_ex(explode)

  if (frameCount % 800 > 0 && frameCount % 800 < 400 && hp < 100) {
    hp += random(0.05, 0.12);
  }

  showHP(width / 2, 70, hp);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  //text("FPS: " + frameRate().toFixed(0), 40, height - 10);
  //text(frameCount, 40, height - 10);
  text(satellites.length + " space debris left", width / 2, 26);
  text("HP: " + hp.toFixed(0), width / 2, 40);
  
  
  if (hp <= 0) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 0, 0);
    text("You FAILED to save the Orbitrons", width / 2, height / 2);
    noLoop(); // Stop the draw loop to freeze the game
  }else if (hp <= 50 && satellites.length <= 0) {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(100);
    text("Wait for it to heal", width / 2, height / 2);
  }else if (hp >= 50 && satellites.length <= 0) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0, 255, 0);
    text("You saved the Orbitrons!!!", width / 2, height / 2);
    noLoop(); // Stop the draw loop to freeze the game
  }
}
