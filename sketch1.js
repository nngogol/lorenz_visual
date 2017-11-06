let numberSlid, floatSlid
function setup() {
	createCanvas(500,500);

	numberSlid = select('#numberSlid')
	numberSlid.input(()=>{
		select('#numberSlidVal').value(numberSlid.value())
	})
	
	floatSlid  = select('#floatSlid')
	floatSlid.input(()=>{
		select('#floatSlidVal').value(floatSlid.value())
	})
}

function draw() {
	ellipse(100, 100, numberSlid.value()*20, numberSlid.value()*20)
	ellipse(200, 200, floatSlid.value()*20, floatSlid.value()*20)
}