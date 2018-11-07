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

function draw_lines() {

// Read inputs, odd?

	strings.forEach(function (item) {


		context.beginPath();
		context.strokeStyle="#FF5555";
		context.moveTo(item.x1 + canvas.width/2, item.y1 + canvas.height/2);
		context.lineTo(item.x2 + canvas.width/2, item.y2 + canvas.height/2);
		context.stroke();
	});
}
