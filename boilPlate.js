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
				scaleVal+=0.07;	if(scaleVal > 10) scaleVal = 10;
			break;
			case 120:
				scaleVal-=0.07;	if(scaleVal< 0.1) scaleVal = 0.1;
			break;
			case 99:
				strokeWVal+=6; if(strokeWVal > 255) strokeWVal = 255;
			break;
			case 118:
				strokeWVal-=6; if(strokeWVal < 0.5) strokeWVal = 0.2;
			break;
		}
	}
}

function draw() {
	// for your key-events aka controling
	control();

	// IMPORTANT
	push()
	
		// for wasd CAMERA
		rotateX(drotateX); rotateY(drotateY); rotateZ(drotateZ); scale(20);
		
		
		// draw your stuff
		beginShape()
			fill(strokeWVal,25,255);
			vertex(1, -2,0)
			vertex(0, -2,0)
			vertex(2, 0,0)
			vertex(3, 0,0)
		endShape()

		beginShape()
			fill(strokeWVal,114,26);
			vertex(3, -2,0)
			vertex(0, -4,0)
			vertex(5, 1,0)
			vertex(2, 2,0)
		endShape()

	// IMPORTANT
	pop()
}


////////////////


