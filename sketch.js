// ``SLIDERS``
let aSlider;
let bSlider;
let cSlider;
// let xSlider;
// let ySlider;
// let zSlider;
let drotateXSlider;
let drotateYSlider;
let drotateZSlider;

let scaleSlider;
let dtSlider;
let points_amountSlider;

// ``VALUE``
//........................
let aValue;
let bValue;
let cValue;
let xValue;
let yValue;
let zValue;
let drotateXValue;
let drotateYValue;
let drotateZValue;

let scaleValue;
let dtValue;
let points_amountValue;








// insOnOffButton
let insOnOffButton;
let insVal = false;
let insTrigger = false;

let insTrigger_Static = true;
let insTrigger_Dynamic = true;


// private shit
let speedCam = 5
let points = []

function setup() {
	createCanvas(500, 500, WEBGL);
	htmlBinding()	
	// colorMode(HSB);
}

function htmlBinding(){

	/////////////////////////////////////////////////////
	aValue 					= select('#aValue')
	bValue 					= select('#bValue')
	cValue 					= select('#cValue')
	xValue 					= select('#xValue')
	yValue 					= select('#yValue')
	zValue 					= select('#zValue')
	drotateXValue 			= select('#drotateXValue')
	drotateYValue 			= select('#drotateYValue')
	drotateZValue 			= select('#drotateZValue')

	scaleValue 				= select('#scaleValue')
	points_amountValue 		= select('#points_amountValue')
	dtValue 				= select('#dtValue')
	
	/////////////////////////////////////////////////////
	aSlider 				= select('#aSlider')              .input(() => {
		aValue.html(aSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	bSlider 				= select('#bSlider')              .input(() => {
		bValue.html(bSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	cSlider 				= select('#cSlider')              .input(() => {
		cValue.html(cSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	// xSlider 				= select('#xSlider')              .input(() => {
	// 	xValue.html(xSlider.value());
	// 	insTrigger_Static = true;
	// 	insTrigger_Dynamic = true;
	// })
	// ySlider 				= select('#ySlider')              .input(() => {
	// 	yValue.html(ySlider.value());
	// 	insTrigger_Static = true;
	// 	insTrigger_Dynamic = true;
	// })
	// zSlider 				= select('#zSlider')              .input(() => {
	// 	zValue.html(zSlider.value());
	// 	insTrigger_Static = true;
	// 	insTrigger_Dynamic = true;
	// })
	drotateXSlider 			= select('#drotateXSlider')       .input(() => {
		drotateXValue.html(drotateXSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	drotateYSlider 			= select('#drotateYSlider')       .input(() => {
		drotateYValue.html(drotateYSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	drotateZSlider 			= select('#drotateZSlider')       .input(() => {
		drotateZValue.html(drotateZSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})

	scaleSlider 			= select('#scaleSlider')          .input(() => {
		scaleValue.html(scaleSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	points_amountSlider 	= select('#points_amountSlider')  .input(() => {
		points_amountValue.html(points_amountSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	dtSlider 				= select('#dtSlider')             .input(() => {
		dtValue.html(dtSlider.value());
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	
	// смена режима
	insOnOffButton 			= select('#insOnOff')			  .mouseClicked(() => {insVal = !insVal; console.log(insVal)})

}

function calc() {

	if(insTrigger){
		points = []
		insTrigger = false
	}

	if (points.length > 2000) {
		return
	}
	for (var i = 0; i < 50; i++) {
		
	  	let dx = (aValue * (yValue - xValue))*dtValue;
	  	let dy = (xValue * (bValue - zValue) - yValue)*dtValue;
		let dz = (xValue * yValue - cValue * zValue)*dtValue;
		
	  	xValue += dx;
	  	yValue += dy;
		zValue += dz;

		points.push(createVector(xValue, yValue, zValue));

	}
}

function see_All_Lorenz_Points() {
	
	beginShape();

	scale(Number(scaleValue.html()));

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




function draw() {
	background(51);

	control();

	push();

		rotateX(radians(Number(drotateXValue.html())));
		rotateY(radians(Number(drotateYValue.html())));
		rotateZ(radians(Number(drotateZValue.html())));
		

		if (insVal) {
			// STATIC

			if (insTrigger_Static) {
				xValue.html(.01)
				yValue.html(0)
				zValue.html(0)
				add_New_ALL_Points();
				insTrigger_Static=false;
			}

			see_All_Lorenz_Points();

		}else{
			// Dynamic

			// make_rerenderBtn_visible();
			// show_points()

			// if (insTrigger_Dynamic) {
			// 	add_New_ALL_Points();
			// 	insTrigger=false;
			// }

			// see_All_Lorenz_Points();v
		}

	pop();
}

// для динамики
function add_New_N_Points() {
	for (let i = 0; i < 5; i++) {
		
	  	let dx = (aValue * (yValue - xValue))*dtValue;
	  	let dy = (xValue * (bValue - zValue) - yValue)*dtValue;
		let dz = (xValue * yValue - cValue * zValue)*dtValue;
		
	  	xValue += dx;
	  	yValue += dy;
		zValue += dz;

		points.push(createVector(xValue, yValue, zValue));

	}
}

// для статикы
function add_New_ALL_Points() {
	points = []
	let ss = Number(points_amountValue.html())
	for (let i = 0; i < ss; i++) {
		
	  	let dx = (Number(aValue.html()) * (Number(yValue.html()) - Number(xValue.html())))*Number(dtValue.html());
	  	let dy = (Number(xValue.html()) * (Number(bValue.html()) - Number(zValue.html())) - Number(yValue.html()))*Number(dtValue.html());
		let dz = (Number(xValue.html()) * Number(yValue.html()) - Number(cValue.html()) * Number(zValue.html()))*Number(dtValue.html());
		
	  	xValue.html(Number(xValue.html()) + dx);
	  	yValue.html(Number(yValue.html()) + dy);
		zValue.html(Number(zValue.html()) + dz);

		points.push(createVector(Number(xValue.html()), Number(yValue.html()), Number(zValue.html())));

	}
}





















// function keyPressed() {	
// 	switch(keyCode){
// 		case 81:
// 			rotateX(speedCam); break;
// 		case 69:
// 			rotateX(-speedCam); break;
// 		case 87:
// 			rotateY(speedCam); break;
// 		case 83:
// 			rotateY(-speedCam); break;
// 		case 65:
// 			rotateZ(speedCam); break;
// 		case 68:
// 			rotateZ(-speedCam); break;
// 	}
// }



function control() {
	if (keyIsPressed === true) {
		// console.log(keyCode);
		switch(keyCode){
			case 119:
				drotateXSlider.html(Number(drotateXSlider.html()) + speedCam); break;
			case 115:
				drotateXSlider.html(Number(drotateXSlider.html()) - speedCam); break;
			case 100:
				drotateYSlider.html(Number(drotateYSlider.html()) + speedCam); break;
			case 97:
				drotateYSlider.html(Number(drotateYSlider.html()) - speedCam); break;
			case 113:
				drotateZSlider.html(Number(drotateZSlider.html()) + speedCam); break;
			case 101:
				drotateZSlider.html(Number(drotateZSlider.html()) - speedCam); break;
		}
	}
}