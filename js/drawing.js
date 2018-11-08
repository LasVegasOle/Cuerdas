// drawing
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);

function draw_circle(x,y) {
  context.beginPath();
  var MULT = 1;
  var rad = 3;
  context.arc(MULT*x + canvas.width/2, MULT*y + canvas.height/2, rad, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();  
}

function draw_points() {
	shapes.forEach(function(item){
		draw_circle(item.x, item.y);
	});
}

function draw_line(x1, y1, x2, y2) {
	context.beginPath();
	context.strokeStyle="#FF5555";
	context.moveTo(x1 + canvas.width/2, y1 + canvas.height/2);
	context.lineTo(x2 + canvas.width/2, y2 + canvas.height/2);
	context.stroke();
}

function draw_lines() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	strings.forEach(function (item) {
	let strings_num = design_params.strings_num;
	let x1 = item.x1;
	let y1 = item.y1;
	let x2 = item.x2;
	let y2 = item.y2;
	let initial_offset = 0;
	
	// Read inputs, odd?
	if(strings_num%2) {
		// odd number
		//console.log("ODD!");
		draw_line(item.x1, item.y1, item.x2, item.y2);
		strings_num--;
		// invert points to draw doing a round tirp
		x1 = item.x2;
		y1 = item.y2;
		x2 = item.x1;
		y2 = item.y1;
	} else {
		// Even
		initial_offset = design_params.strings_spacing/2;
	}
	
	for (var i = 0; i < strings_num; i++) {
		//console.log("i = " + i)
		let length = i * design_params.strings_spacing - initial_offset;
		//console.log("strings_num = " + strings_num + 
		//			" ;strings_spacing = " + design_params.strings_spacing +
		//			" ;initial_offset = " + initial_offset);
		//console.log(length);

		let t = tangential_point(item.x1, item.y1, item.x2, item.y2, 1, 2, 
			length);

		//console.log(t);
		draw_line(item.x1, item.y1, t.x, t.y);
		draw_line(t.x, t.y, item.x2, item.y2);

		length = - i*design_params.strings_spacing + initial_offset;
		//console.log("length 2 = " + length);

		t = tangential_point(item.x1, item.y1, item.x2, item.y2, 1, 2, 
			length);

		draw_line(item.x2, item.y2, t.x, t.y);
		draw_line(t.x, t.y, item.x1, item.y1);

		
	}

	});
}
