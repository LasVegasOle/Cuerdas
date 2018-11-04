// drawing
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);

function draw_circle(x,y) {
  context.beginPath();
  var MULT = 2.5;
  var rad = 4;
  context.arc(MULT*x + canvas.width/2, MULT*y + canvas.height/2, rad, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();  
}

function draw_points() {
	shapes.forEach(function(item){
		draw_circle(item.x, item.y);
	});
}