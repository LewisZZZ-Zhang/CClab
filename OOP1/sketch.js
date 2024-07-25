let a 

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent('sketch-holder');
    a = new taxi();
    console.log(a);
}

function draw() {
    background(255);
    a.display()
}

class taxi{
    constructor() {
        this.x = 100;
        this.y = 100;
        this.s = 0.5
    }

    display() {
        push();
        translate(this.x, this.y);
        scale(this.s);

            noStroke();
            fill(240, 220, 60);

            // base:
            rect(-50, -50, 100, 30);
            // top"
            rect(-25, -70, 50, 20);
            // wheel 1:
            this.drawWheel(-30, -15);
            // wheel 2:
            this.drawWheel( 30, -15);

            // just to see origin 
            // of translation matrix:
            fill("red");
            circle(0, 0, 5); 

        pop();
    }

    drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        // rotate(radians(wheelAngle));

            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);

        pop();
    }
}