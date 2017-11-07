// ``SLIDERS``
p5.disableFriendlyErrors = true;

let a;
let b;
let c;
let drotateX;
let drotateY;
let drotateZ;

let x = 0.01;
let y = 0;
let z = 0;

let scalea;
let dt;
let points_amount;

// insOnOffButton
let insOnOffButton;
let insVal = false;
let insTrigger = false;
let insTrigger_Static = true;
let insTrigger_DynamicR = true;
let insTrigger_DynamicLive = true;

let controlWithMouse = false
// private shit
let speedCam = 5
let points = []
let draw_State = 1
let pointMaker_dynamicR;

function setup() {
	createCanvas(500, 500, WEBGL);
	controlWithMouse = false
	htmlBinding()	
	// colorMode(HSB);
}

let see_All_Lorenz_Points = () => {
	
	// смена drotateX\Y\Z
	control();

	push();
	if(controlWithMouse){
		rotateY(map(mouseX,0,width,0,PI));
		rotateX(map(mouseY,0,height,0,PI));
	}else{
		rotateY(radians(drotateX.value()));
		rotateX(radians(drotateY.value()));
	}
	rotateZ(radians(drotateZ.value()));

	stroke(0)

	beginShape();

	scale(scalea.value());

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

	pop();
}

let see_Coordinates = () => {

	beginShape()
	stroke(255,0,0)
	vertex(100,0,0)
	vertex(0,0,0)
	endShape()

	beginShape()
	stroke(0,255,0)
	vertex(0,100,0)
	vertex(0,0,0)
	endShape()

	beginShape()
	stroke(0,0,255)
	vertex(0,0,100)
	vertex(0,0,0)
	endShape()

}

let makeingCals = (init_a = a.value(), init_b = b.value(), init_c = c.value(), init_dt = dt.value()) => {
	let cals = () => {
		for (let i = 0; i < 5; i++) {
	
		  	let dx = (init_a * (y - x))*init_dt
		  	let dy = (x * (init_b - z) - y)*init_dt
			let dz = (x * y - init_c * z)*init_dt
			
		  	x += dx
		  	y += dy
			z += dz
			points.push(createVector(x,y,z));
			if (points.length > points_amount.value()) {
				points.splice(0,5);
			}
		}
	}

	return cals
}


let doStatic = () => {
	background(250,0,0,20)

	// Static
	if (insTrigger_Static) {
		x = .01;
		y = 0;
		z = 0;
		add_New_ALL_Points();
		insTrigger_Static=false;
	}

	see_All_Lorenz_Points();
	see_Coordinates();
}


let doDynaminR = () => {
	background(0,250,0,60)

	// Dynamic
	if (insTrigger_DynamicR) {
		points = []
		x = .01;
		y = 0;
		z = 0;
		pointMaker_dynamicR = makeingCals()
		insTrigger_DynamicR=false;
	}

	pointMaker_dynamicR()
	see_All_Lorenz_Points();
}

let doDynaminLive = () => {
	background(0,0,250,60)
}

function draw(){

	switch(draw_State){
		case 1: doStatic(); break;
		case 2: doDynaminR(); break;
		case 3: doDynaminLive(); break;
		default: throw 'draw_State broken';
	}
}

// для статикы
function add_New_ALL_Points() {
	points = []
	let ss = points_amount.value()

	for (let i = 0; i < ss; i++) {
		
	  	let dx = (a.value() * (y - x))*dt.value();
	  	let dy = (x * (b.value() - z) - y)*dt.value();
		let dz = (x * y - c.value() * z)*dt.value();
		
	  	x += dx
	  	y += dy
		z += dz
		points.push(createVector(x,y,z));

	}
}

let control = () => {
	if (keyIsPressed === true) {
		switch(keyCode){
			case 119: 	drotateX.value(drotateX.value() + speedCam); break; //w
			case 115: 	drotateX.value(drotateX.value() - speedCam); break; //s
			case 100: 	drotateY.value(drotateY.value() + speedCam); break; //d
			case  97: 	drotateY.value(drotateY.value() - speedCam); break; //a
			case 113: 	drotateZ.value(drotateZ.value() + speedCam); break; //q
			case 101: 	drotateZ.value(drotateZ.value() - speedCam); break; //e
			case 99: 	scalea.value(scalea.value() - .1); break; // c
			case 118: 	scalea.value(scalea.value() + .1); break; // v
			case 114: 	insTrigger_DynamicR=true; break; // r
			case 109: 	controlWithMouse=!controlWithMouse; break; // r
			
		}
	}
}

let htmlBinding = () => {

	a 				= select('#aSlider')
	a.input(() => {
		select("#aValue").value(a.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	b 				= select('#bSlider')
	b.input(() => {
		select('#bValue').value(b.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	c 				= select('#cSlider')
	c.input(() => {
		select('#cValue').value(c.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})

	drotateX 			= select('#drotateXSlider')
	drotateX.input(() => {
		select('#drotateXValue').value(drotateX.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	drotateY 			= select('#drotateYSlider')
	drotateY.input(() => {
		select('#drotateYValue').value(drotateY.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	drotateZ 			= select('#drotateZSlider')
	drotateZ.input(() => {
		select('#drotateZValue').value(drotateZ.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})

	scalea 			= select('#scaleSlider')
	scalea.input(() => {
		select('#scaleValue').value(scalea.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	points_amount 	= select('#points_amountSlider')
	points_amount.input(() => {
		select('#points_amountValue').value(points_amount.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	dt 				= select('#dtSlider')
	dt.input(() => {
		select('#dtValue').value(dt.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	
	// смена режима
	select('#Static')			  			.mouseClicked(() => {draw_State = 1})
	select('#Dynamic_rerender')			  	.mouseClicked(() => {draw_State = 2; insTrigger_DynamicR=true;})
	select('#Dynamic_live')			  		.mouseClicked(() => {draw_State = 3})
}