/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YourNameDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YourNameDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.hipx = startX;
    this.hipy = startY + 30;
    this.shoulderx = startX;
    this.shouldery = startY - 50;
    this.color = [122,122,122];
    // add properties for your dancer here:
    //..
    //..
    //..
  }

  head(x, y, r) {
    push();
    translate(x, y);
    ellipse(0, 0, r, 2 * r);
    pop();

  }

  body(hipx, hipy, shoulderx, shouldery) {

    strokeWeight(5);
    rect(shoulderx - 20, shouldery, 40, hipy - shouldery);
  }

  leg(hipx, hipy, feetx, feety) {

    strokeWeight(10);
    line(hipx, hipy, feetx, feety);
  }

  arm(shoulderx, shouldery, handx, handy, LorR) {

    strokeWeight(5);
    line(shoulderx, shouldery, (handx + shoulderx) / 2 + LorR * 10, (handy + shouldery) / 2 + sin(LorR * frameCount * PI / 30) * 10);
    line((handx + shoulderx) / 2 + LorR * 10, (handy + shouldery) / 2 + sin(LorR * frameCount * PI / 30) * 10, handx, handy + sin(LorR * frameCount * PI / 30) * 20);

  }

  head(x, y, r) {
    push();
    translate(x, y);
    ellipse(0, 0, r, r);
    pop();
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    if (frameCount % 180 > 45 && frameCount % 180 < 105) {
      // this.lag = random(0,2)
    } else {
      this.hipx = sin(frameCount * PI / 30) * 40 + this.x;

      this.shoulderx = this.hipx
      this.shouldery = this.hipy - 50
    }

    this.color = [ this.color[0]+ random(-10, 10), this.color[1]+random(-10, 10), this.color[2] + random(-10, 10)];
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    fill(this.color[0],this.color[1],this.color[2]);
    stroke(this.color[0],this.color[1],this.color[2]);
    this.leg(this.hipx - 10, this.hipy, this.x - 50, this.y + 100);
    this.leg(this.hipx + 10, this.hipy, this.x + 50, this.y + 100);
    this.arm(this.shoulderx - 20, this.shouldery, (this.x - 100) * 1 / 2 + this.hipx * 1 / 2, this.y - 50, -1);
    this.arm(this.shoulderx + 20, this.shouldery, (this.x + 100) * 1 / 3 + this.hipx * 2 / 3, this.y - 50, 1);
    this.body(this.hipx, this.hipy, this.shoulderx, this.shouldery);
    sin(frameCount * PI / 30) * 10
    this.head(this.shoulderx, this.shouldery - 25, 20);
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️






    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/