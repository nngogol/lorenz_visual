p5.disableFriendlyErrors = true;




//								can change

let points = []



let x = 0.01;
let y = 0;
let z = 0;

let a;
let b;
let c;

let dt;
let scalea;
let points_amount;

let drotateX;
let drotateY;
let drotateZ;

// controll

let keyz = [
    {  status:false,  code:'w' },
    {  status:false,  code:'s' },
    {  status:false,  code:'a' },
    {  status:false,  code:'d' },

    {  status:false,  code:'q' },
    {  status:false,  code:'e' },

    {  status:false,  code:'c' },
    {  status:false,  code:'v' },

    {  status:false,  code:'1' },
    {  status:false,  code:'2' },
    {  status:false,  code:'4' },
    {  status:false,  code:'5' },
    {  status:false,  code:'7' },
    {  status:false,  code:'8' },
  ]

function keyPressed(event) {
  for (let i = 0; i < keyz.length; i++) {
    if (event.key == keyz[i].code){
      keyz[i].status = true
      break;
    }
  }

	// console.log(keyCode)
	// use keyPressed() when you need to switch something like button
	// coz control() are launch every frame,
	// so u will switch your btns very fast
	switch(event.keyCode){
		case 82: 	insTrigger_DynamicR=true; insTrigger_DynamicLive=true;		break; // r
		case 77: 	controlWithMouse=!controlWithMouse; 						break; // m
		case 75:	ShowCoordinates = !ShowCoordinates; 						break; // k
		case 76:	autoMove = !autoMove;				 						break; // l
	}
}

function keyReleased(event) {
  for (let i = 0; i < keyz.length; i++) {
    if (event.key == keyz[i].code){
      keyz[i].status = false
      break;
    }
  }
}

function control(){

  keyz.map(x => {

    // нажата ли клавиша
    if (x.status) {

        // если нажата, то выполни действие, которое означает .code
        switch(x.code){
			case 'w': 	drotateY.value(drotateY.value() + speedCam); 	break;
			case 's': 	drotateY.value(drotateY.value() - speedCam); 	break;
			case 'd': 	drotateX.value(drotateX.value() + speedCam); 	break;
			case 'a': 	drotateX.value(drotateX.value() - speedCam); 	break;
			case 'q': 	drotateZ.value(drotateZ.value() + speedCam); 	break;
			case 'e': 	drotateZ.value(drotateZ.value() - speedCam); 	break;
			case 'c': 	scalea.value(scalea.value() - .1); 				break;
			case 'v': 	scalea.value(scalea.value() + .1); 				break;

			case '1': 	a.value(a.value() + .1); break;
			case '2': 	a.value(a.value() - .1); break;
			case '4':    b.value(b.value() + .1); break;
			case '5':    b.value(b.value() - .1); break;
			case '7':    c.value(c.value() + .1); break;
			case '8':    c.value(c.value() - .1); break;
      }
    }
  })
}

// end controll


let insOnOffButton;
let insVal = false;
let insTrigger = false;
let insTrigger_Static = true;
let insTrigger_DynamicR = true;
let insTrigger_DynamicLive = true;
let ShowCoordinates = false
let autoMove = false

let controlWithMouse = false
// private shit
let speedCam = 5
let draw_State = 'static'
let pointMaker_dynamicR;

function setup() {
	let can = createCanvas(1500, 800, WEBGL);
	can.parent(select('#can'))

	htmlBinding()	
	colorMode(HSB);
}

function draw(){

	switch(draw_State){
		case 'static': doStatic(); break;
		case 'dynamicR': doDynaminR(); break;
		case 'dynamicLive': doDynaminLive(); break;
		default: throw 'draw_State broken';
	}
}




let see_All_Lorenz_Points = (colorr) => {
	
	// смена drotateX\Y\Z
	control();


	push();

		background(colorr)

		// scale
		scale(scalea.value());

		if(autoMove){
			// rotate
			if(controlWithMouse){
				rotateY(map(mouseX,0,width,0,PI*3));
				rotateZ(map(mouseY,0,height,0,PI*3));
				rotateX(radians(drotateZ.value()));
			}else{
				rotateY(radians(drotateX.value()));
				rotateX(radians(drotateY.value()));
			}
		}else{
			// console.log(sin(frameCount*.01))
			rotateX(radians(sin(frameCount*.002)));

			rotateZ(
				radians(
					frameCount*.02
					)
				);

			rotateY(
				radians(
					frameCount*map(mouseX, 0, width, .5, 1.0)
					)
				);

			rotateX(radians(drotateZ.value()));
		}

		// coordinatel
		if(ShowCoordinates)	see_Coordinates();


		// your model with vertex()
		beginShape();
		noFill();
		strokeWeight(2)
		let hu = 0;
		// points.forEach( (el,ind)=>
		// {
			// let v = el;

			// vertex(v['point'].x, v['point'].y, v['point'].z);

			// stroke(v['color'], 82, 50);

		 //    hu += 0.1;
		 //    if (hu > 255)
		 //    	hu = 0
		// })

		for (var i = points.length - 1; i >= 0; i--) {
			
			let v = points[i];

			vertex(v['point'].x, v['point'].y, v['point'].z);

			stroke(v['color'], 82, 50);

		    hu += 0.1;
		    if (hu > 255)
		    	hu = 0
		}
		endShape();

	pop();
}

let see_Coordinates = () => {

	push()

	beginShape()
	stroke(360, 100, 50)
	vertex(10,0,0)
	vertex(0,0,0)
	endShape()

	beginShape()
	stroke(120, 100, 50)
	vertex(0,10,0)
	vertex(0,0,0)
	endShape()

	beginShape()
	stroke(240, 100, 50)
	vertex(0,0,10)
	vertex(0,0,0)
	endShape()

	pop()
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
			points.push({'point' : createVector(x,y,z), 'color': frameCount+0 });
			if (points.length > points_amount.value()) {
				points.splice(0,5);
			}
		}
	}

	return cals
}


let doStatic = () => {

	// Static
	if (insTrigger_Static) {
		x = .01;
		y = 0;
		z = 0;
		add_New_ALL_Points();
		insTrigger_Static=false;
	}

	see_All_Lorenz_Points(color(250,0,0,20));
}


let doDynaminR = () => {
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
	see_All_Lorenz_Points(color(0,250,0));
}

let doDynaminLive = () => {
	// Dynamic
	if (insTrigger_DynamicLive) {
		points = []
		x = .01;
		y = 0;
		z = 0;
		insTrigger_DynamicLive=false;
	}

	for (let i = 0; i < 1; i++) {
	
	  	let dx = (a.value() * (y - x))*dt.value()
	  	let dy = (x * (b.value() - z) - y)*dt.value()
		let dz = (x * y - c.value() * z)*dt.value()
		
	  	x += dx
	  	y += dy
	  	z += dz

		points.push({'point' : createVector(x,y,z), 'color': frameCount+0 });

		if (points.length > points_amount.value()) {
			points.splice(0,1);
		}
	}

	see_All_Lorenz_Points(color(0,0,250));
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
		points.push({'point' : createVector(x,y,z), 'color': frameCount+0 });

	}
}



let htmlBinding = () => {

	// optimization
	let aVal 				= select("#aValue")
	let bVal 				= select('#bValue')
	let cVal 				= select('#cValue')
	let drotateXVal 		= select('#drotateXValue')
	let drotateYVal 		= select('#drotateYValue')
	let drotateZVal 		= select('#drotateZValue')
	let scaleVal 			= select('#scaleValue')
	let points_amountVal 	= select('#points_amountValue')
	let dtVal 				= select('#dtValue')

	a 				= select('#aSlider')
	a.input(() => {
		aVal.value(a.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	aVal.value(a.value())
	b 				= select('#bSlider')
	b.input(() => {
		bVal.value(b.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	bVal.value(b.value())
	c 				= select('#cSlider')
	c.input(() => {
		cVal.value(c.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	cVal.value(c.value())

	drotateX 			= select('#drotateXSlider')
	drotateX.input(() => {
		drotateXVal.value(drotateX.value())
		// insTrigger_Static = true;
		// insTrigger_Dynamic = true;
	})
	drotateXVal.value(drotateX.value())
	drotateY 			= select('#drotateYSlider')
	drotateY.input(() => {
		drotateYVal.value(drotateY.value())
		// insTrigger_Static = true;
		// insTrigger_Dynamic = true;
	})
	drotateYVal.value(drotateY.value())
	drotateZ 			= select('#drotateZSlider')
	drotateZ.input(() => {
		drotateZVal.value(drotateZ.value())
		// insTrigger_Static = true;
		// insTrigger_Dynamic = true;
	})
	drotateZVal.value(drotateZ.value())

	scalea 			= select('#scaleSlider')
	scalea.input(() => {
		scaleVal.value(scalea.value())
		// insTrigger_Static = true;
		// insTrigger_Dynamic = true;
	})
	scaleVal.value(scalea.value())
	points_amount 	= select('#points_amountSlider')
	points_amount.input(() => {
		points_amountVal.value(points_amount.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})
	points_amountVal.value(points_amount.value())
	dt 				= select('#dtSlider')
	dt.input(() => {
		dtVal.value(dt.value())
		insTrigger_Static = true;
		insTrigger_Dynamic = true;
	})

	// setting up dt in javaScript!!!!!!!!!!
	dt.value(0.01)
	dtVal.value(0.01)
	

	// смена режима
	select('#Static')			.mouseClicked(() => {draw_State = 'static';
		switchAllTrigers()
	})
	select('#Dynamic_rerender')	.mouseClicked(() => {draw_State = 'dynamicR';
		switchAllTrigers()
	})
	select('#Dynamic_live')		.mouseClicked(() => {draw_State = 'dynamicLive';
		switchAllTrigers()
	})
}

function switchAllTrigers() {
	insTrigger_Static=true;
	insTrigger_DynamicR=true;
	insTrigger_DynamicLive=true;
}