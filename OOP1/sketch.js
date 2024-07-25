let a 

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent('sketch-holder');
    a = new taxi();
    console.log(a);
}

function draw() {
    background(0);
    fill(255,0,0);
}

class taxi{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.s = 0.5
    }
}