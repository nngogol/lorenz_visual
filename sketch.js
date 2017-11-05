// var x = 0.01;
// var xMin = 1;
// var xMax = 20;
// var xStep = 0.05;

// var y = 0;
// var yMin = 1;
// var yMax = 20;
// var yStep = 0.05;

// var z = 0;
// var zMin = 1;
// var zMax = 20;
// var zStep = 0.05;
// ////////////////////////////////
// var a = 10;
// var aMin = 1;
// var aMax = 20;
// var aStep = 0.05;

// var b = 28;
// var bMin = 1;
// var bMax = 20;
// var bStep = 0.05;

// var c = 8.0/3.0;
// var cMin = 1;
// var cMax = 20;
// var cStep = 0.05;
// ////////////////////////////////
// var dt = 0.01;
// var dtMin = 0.001;
// var dtMax = 0.09;
// var dtStep = 0.0005;

// var points_amount = 2000;
// var points_amountMin = 100;
// var points_amountMax = 10000;
// var points_amountStep = 10;

// var scaleVal = 5;
// var scaleValMin = 1;
// var scaleValMax = 100;
// var scaleValStep = 1;


// a\b\c
let aSlider = 0; let bSlider = 0; let cSlider = 0; let aValue = 0; let bValue = 0; let cValue = 0; 
// x\y\z
let xSlider = 0; let ySlider = 0; let zSlider = 0; let xValue = 0; let yValue = 0; let zValue = 0; 
// drorateX\Y\Z
let drotateXSlider = 0; let drotateYSlider = 0; let drotateZSlider = 0; let drotateXValue = 0; let drotateYValue = 0; let drotateZValue = 0;

// scale
let scaleSlider = 0; let scaleValue = 0;

// dt
let dtSlider = 0; let dtValue = 0;

// points_amount
let points_amountSlider = 0; let points_amountValue = 0;

// insOnOffButton
let insOnOffButton;


let speedCam = 2
let points = []

function setup() {
	createCanvas(800, 600, WEBGL);


	/////////////////////////////////////////////////////
	aValue 				= select('#aValue')
	bValue 				= select('#bValue')
	cValue 				= select('#cValue')
	xValue 				= select('#xValue')
	yValue 				= select('#yValue')
	zValue 				= select('#zValue')
	drotateXValue 		= select('#drotateXValue')
	drotateYValue 		= select('#drotateYValue')
	drotateZValue 		= select('#drotateZValue')
	
	scaleValue 			= select('#scaleValue')
	points_amountValue 	= select('#points_amountValue')
	dtValue 			= select('#dtValue')
	
	/////////////////////////////////////////////////////

	/////////////////////////////////////////////////////
	aSlider 			= select('#aSlider').input(() => aValue.html(aSlider.value())   )
	bSlider 			= select('#bSlider').input(() => bValue.html(bSlider.value())   )
	cSlider 			= select('#cSlider').input(() => cValue.html(cSlider.value())   )
	xSlider 			= select('#xSlider').input(() => xValue.html(xSlider.value())   )
	ySlider 			= select('#ySlider').input(() => yValue.html(ySlider.value())   )
	zSlider 			= select('#zSlider').input(() => zValue.html(zSlider.value())   )
	drotateXSlider 		= select('#drotateXSlider').input(() => drotateXValue.html(drotateXSlider.value())   )
	drotateYSlider 		= select('#drotateYSlider').input(() => drotateYValue.html(drotateYSlider.value())   )
	drotateZSlider 		= select('#drotateZSlider').input(() => drotateZValue.html(drotateZSlider.value())   )


	scaleSlider 			= select('#scaleSlider').input(() => scaleValue.html(scaleSlider.value())   )
	points_amountSlider 	= select('#points_amountSlider').input(() => points_amountValue.html(points_amountSlider.value())   )
	dtSlider 				= select('#dtSlider').input(() => dtValue.html(dtSlider.value())   )
	

	


	colorMode(HSB);
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

	// rotateX(radians(drotateX));
	// rotateY(radians(drotateY));
	// rotateZ(radians(drotateZ));

	// rotateY(radians(map(mouseX, 0, width, 0, 360)))
	// rotateX(radians(map(mouseY, 0, height, 0, 360)))
	// beginShape();
	// vertex(0, 0, 1)
	// vertex(0, 1, 0)
	// vertex(1, 0, 0)
	// endShape();
	// calc()
	// viewModel()
	pop();
}