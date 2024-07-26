let a,b
let honk1,honk2,ambience

function preload() {
    honk1 = loadSound("assets/honk1.mp3")
    honk2 = loadSound("assets/honk2.mp3")
    ambience = loadSound("assets/ambience.mp3")
}

function mousePressed() {
    // honk1.play();
    ambience.loop();
}

function setup() {
    let cnv = createCanvas(800, 600);
    cnv.parent('sketch-holder');
    a = new taxi(100,200,1,1);
    b = new taxi(300,400,2,-2);
    console.log(a);
}

function draw() {
    background(255);

    a.update()
    a.display()

    b.update()
    b.display()


}



class taxi{
    constructor(startX,startY,size,startSpeed) {
        this.x = startX;
        this.y = startY;
        this.s = size
        this.wheelAngle = 0;
        this.wheelSpeed = 2
        this.speed = startSpeed;
    }

    spinWheel() {
        this.wheelAngle += this.wheelSpeed;
    }

    move() {
        this.x += this.speed

        if (this.x>width) {
            this.x = 0
        }


        if (this.x<0) {
            this.x = width
        }
    }

    update() {
        this.move()
        this.spinWheel()
        this.maybeHonk()
    }

    maybeHonk() {
        if (random()<0.01) {
            if (random() < 0.5) {
                honk1.play();
            } else {
                honk2.play();
            }
        }
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
        rotate(radians(this.wheelAngle));

            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);

        pop();
    }
}