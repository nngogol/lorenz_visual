
let img;
let oobj;
let scaleVal = 1;
let strokeWVal = 1;

let speedCam = 0.05
let drotateX = 179
let drotateY = 0
let drotateZ = 0

function setup() {
	createCanvas(300, 300, WEBGL);
}


function control(){
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
			case 122:
				scaleVal+=0.07;
				if(scaleVal > 10)
					scaleVal = 10;
			break;
			case 120:
				scaleVal-=0.07;
				if(scaleVal< 0.1)
					scaleVal = 0.1;
			break;
			case 99:
				strokeWVal+=6;
				if(strokeWVal > 255)
					strokeWVal = 255;
				console.log(strokeWVal);
			break;
			case 118:
				strokeWVal-=6;
				if(strokeWVal < 0.5)
					strokeWVal = 0.2;
				console.log(strokeWVal);
			break;
		}
	}
}

function draw() {
	// background(200);

	control();

	push()
		
	rotateX(drotateX); rotateY(drotateY); rotateZ(drotateZ); scale(20);
	scale(scaleVal);
	
	fill(strokeWVal,25,255);
	drawGogol()

	pop()
}


////////////////

function drawGogol(){

	function nose() {
	beginShape()
		vertex(1, -2,0)
		vertex(0, -2,0)
		vertex(2, 0,0)
		vertex(3, 0,0)
	endShape()
	}

	function hair() {
		fill(0)
		beginShape()
			vertex(4,0,0)
			vertex(4,-2,0)
			vertex(2,-2,0)
		endShape(CLOSE)
		}

	function clouth() {

		fill(0)
		beginShape()
		vertex(0,-4,0)
		vertex(0,-3,0)
		vertex(4,-3,0)
		vertex(4,-4,0)
		endShape(CLOSE)

		
		}

	function pugovichka(){
		fill(255)
		// ellipse(0.5,-3.5, 0.5)
		let pp = 0.7
		translate(0.5, -3.5, 0)
		ellipsoid(0.5*pp, 0.5*pp, 0.5*pp, 20, 20)
		translate(-0.5, +3.5, 0)

	}
	nose()
	hair()
	clouth()
	pugovichka()
}


