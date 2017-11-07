function setup() {
	createCanvas(500, 500);
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

////////////////////

let x1 = (y) => {
	return 7*sqrt(1-(y*y/3))
}

let x1_ = (y) => {
	return -7*sqrt(1-(y*y/3))
}

let y2_c = (3*Math.sqrt(33)*7/112)
let y2 = (x) => {
	return (Math.floor(x/2)*y2_c*x*x-3) + Math.sqrt(1-Math.pow((Math.floor(Math.floor(x)-2)),2))
}

let y3 = (x) => {
	return 9-8*Math.floor(x)
}

let y3_ = (x) => {
	return 9-8*Math.floor(x)
}

let y4 = (x) => {
	return 3*Math.floor(x)+0.75
}

let y4_ = (x) => {
	return 3*Math.floor(x)+0.75
}

let y5 = (x) => {
	return 2.25
}

let y6_c1 = 6*Math.sqrt(10)/7
let y6_c2 = 6*Math.sqrt(10)/14

let y6 = (x) => {
	return (y6_c1+(1.5-0.5*Math.floor(x)))-(y6_c2)*
	Math.sqrt(4-Math.pow(Math.floor(x)-1,2))
}

let y6_ = (x) => {
	return (y6_c1+(1.5-0.5*Math.floor(x)))-(y6_c2)*
	Math.sqrt(4-Math.pow(Math.floor(x)-1,2))
}

let x = -8.0
function draw(){
	x-=.1

	

	draw()

}
