var x = 0.01;
var xMin = 1;
var xMax = 20;
var xStep = 0.05;

var y = 0;
var yMin = 1;
var yMax = 20;
var yStep = 0.05;

var z = 0;
var zMin = 1;
var zMax = 20;
var zStep = 0.05;
////////////////////////////////
var a = 10;
var aMin = 1;
var aMax = 20;
var aStep = 0.05;

var b = 28;
var bMin = 1;
var bMax = 20;
var bStep = 0.05;

var c = 8.0/3.0;
var cMin = 1;
var cMax = 20;
var cStep = 0.05;
////////////////////////////////
var dt = 0.01;
var dtMin = 0.001;
var dtMax = 0.09;
var dtStep = 0.0005;

var points_amount = 2000;
var points_amountMin = 100;
var points_amountMax = 10000;
var points_amountStep = 10;

var scaleVal = 5;
var scaleValMin = 1;
var scaleValMax = 100;
var scaleValStep = 1;


var gui;
let speedCam = 2

let drotateX = 0
let drotateY = 0
let drotateZ = 0


let points = []

function setup() {
	createCanvas(800, 600, WEBGL);
	gui = createGui()
	gui.addGlobals('x', 'y', 'z', 'a', 'b', 'c', 'dt',
		'points_amount',
		'scaleVal')

	colorMode(HSB);
	// translate(0, 0, 0);
	

	// ortho(-width, width, height, -height/2, 0.1, 100);
}

function calc() {
	if (points.length > 2000) {
		return
	}
	for (var i = 0; i < 50; i++) {
		
	  	let dx = (a * (y - x))*dt;
	  	let dy = (x * (b - z) - y)*dt;
		let dz = (x * y - c * z)*dt;
		
	  	x += dx;
	  	y += dy;
		z += dz;

		points.push(createVector(x, y, z));

	}
}

function viewModel() {
	
	beginShape();

	scale(scaleVal);
  	strokeWeight(20);
	noFill();

	let hu = 0;

	for (var i = 0; i < points.length; i++) {
		fill(hu, 255, 255);
		let v = points[i];
		vertex(v.x, v.y, v.z);

	    hu += 0.1;
	    if (hu > 255)
	    	hu = 0
	}

  endShape();
}


function keyPressed() {	
	// switch(keyCode){
	// 		case 81:
	// 			drotateX += speedCam; break;
	// 		case 69:
	// 			drotateX -= speedCam; break;
	// 		case 87:
	// 			drotateY += speedCam; break;
	// 		case 83:
	// 			drotateY -= speedCam; break;
	// 		case 65:
	// 			drotateZ += speedCam; break;
	// 		case 68:
	// 			drotateZ -= speedCam; break;
	// 	}

	switch(keyCode){
		case 81:
			rotateX(speedCam); break;
		case 69:
			rotateX(-speedCam); break;
		case 87:
			rotateY(speedCam); break;
		case 83:
			rotateY(-speedCam); break;
		case 65:
			rotateZ(speedCam); break;
		case 68:
			rotateZ(-speedCam); break;
	}
}

function draw() {
	background(51);


	push();

	if (keyIsPressed === true) {
		// console.log(keyCode);
		switch(keyCode){
			case 119:
				drotateX += speedCam; break;
			case 115:
				drotateX -= speedCam; break;
			case 100:
				drotateY += speedCam; break;
			case 97:
				drotateY -= speedCam; break;
			case 113:
				drotateZ += speedCam; break;
			case 101:
				drotateZ -= speedCam; break;
		}
	}

	rotateX(radians(drotateX));
	rotateY(radians(drotateY));
	rotateZ(radians(drotateZ));

	// rotateY(radians(map(mouseX, 0, width, 0, 360)))
	// rotateX(radians(map(mouseY, 0, height, 0, 360)))
	// beginShape();
	// vertex(0, 0, 1)
	// vertex(0, 1, 0)
	// vertex(1, 0, 0)
	// endShape();
	calc()
	viewModel()
	pop();
}