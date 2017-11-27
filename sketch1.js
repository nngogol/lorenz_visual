// /////                           2d

// function setup() {
//     createCanvas(100,100);
//     // noFill();
//     fill(255,0,0)
// }

// function draw() {
//     background(150)

//     beginShape();
//     vertex(   map(mouseX, 0, width, 15,30),    10)
//     vertex(   50,    map(mouseY, 0, height, 15,30))
//     vertex(   50,    map(mouseY, 0, height, 15+30,50+30))
//     endShape(CLOSE);
// }

/////                           3d
function setup() {
    createCanvas(300,300, WEBGL);
    translate(-150,-150,0)
}

function draw() {
    background(251)
    scale(2)
    fill(255,0,0)

    beginShape();
    vertex(   map(mouseX, 0, width, 15,30),    10       , 0)
    vertex(   50,    map(mouseY, 0, height, 15,30)      , 0)
    vertex(   50,    map(mouseY, 0, height, 15+30,50+30), 0)
    endShape();
}