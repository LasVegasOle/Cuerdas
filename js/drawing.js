// drawing
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);

function draw_circle(x,y) {
  context.beginPath();
  var MULT = 1;
  var rad = 3;
  context.arc(MULT*x /*+ canvas.width/2*/, MULT*y/* + canvas.height/2*/, rad, 0, 2 * Math.PI, false);
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
	context.strokeStyle = "#FF5555";
	context.lineWidth = 2;
	context.moveTo(x1/* + canvas.width/2*/, y1/* + canvas.height/2*/);
	context.lineTo(x2 /*+ canvas.width/2*/, y2 /*+ canvas.height/2*/);
	context.stroke();
}


function draw_node_lines(p_start, p_end, initial_offset, positive) {

	// sing
	//console.log("positive = " + positive);
	// Yes, the sign game to make this work with odd and even nodes is magical, future Luis I am sorry
	let sign;
	if(positive) {
		sign = 1;
	} else {
		if (design_params.nodes_num%2) {
		sign = -1;
		} else {
		sign = 1;
		}
	}

	// Strings
	for (var i = 1; i <= design_params.strings_num/2; i++) {

	let p_node = p_start;
	let spacing;

	if(positive) {

		//console.log("i_pos = " + i);
		spacing = i * design_params.strings_spacing - initial_offset;

	} else { // negative
		//console.log("i_neg = " + i);
		spacing = - i * design_params.strings_spacing + initial_offset;
	}

		for (var j = 1; j < (design_params.nodes_num + 1); j++) {
			
			let t;
			//console.log("Number of Nodes = " + design_params.nodes_num);

			if(j%2) {

				// "j*2 - 1, design_params.nodes_num*2,"
				// This is magic math to make the distance between nodes equals
				t = tangential_point(p_start.x, p_start.y, p_end.x, p_end.y, 
										j*2 - 1, design_params.nodes_num*2, 
										sign*spacing);

				draw_line(p_node.x, p_node.y, t.x, t.y);
				draw_circle(t.x, t.y);
				//console.log("spacing = " + spacing);
				//console.log("+ ODD; sign = " +sign + " j = " + j + ", p_x = " + p_node.x + ", p_y = " + p_node.y + "; t_x = " + t.x + "; t_y = " + t.y);

			} else {
				// flip sign for multiple nodes
				let multy_node_sign = -1*sign;

				t = tangential_point(p_start.x, p_start.y, p_end.x, p_end.y, 
										j*2 - 1, design_params.nodes_num*2, 
										multy_node_sign*spacing);
				draw_circle(t.x, t.y);
				draw_line(p_node.x, p_node.y, t.x, t.y);
				//console.log("+ EVEN; sign = " +sign + ", j = " + j + ", p_x = " + p_node.x + ", p_y = " + p_node.y + "; t_x = " + t.x + "; t_y = " + t.y);
			}
			p_node = t;
		}

		draw_line(p_node.x, p_node.y, p_end.x, p_end.y);
		//console.log("Closing string; p1 x: " + p_node.x + ", p1 y: " + p_node.y + ", p2 x: " + p_end.x + ", p2 y: " + p_end.y);
	}
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


		//console.log("\n~~~~ POSITIVE STRINGS ~~~~ ");

		// Postive direction strings
		draw_node_lines({x: item.x1, y: item.y1}, {x: item.x2, y: item.y2}, initial_offset, true);

		//console.log("\n~~~~ NEGATIVE STRINGS ~~~~ ");
		// Negative direction strings
		draw_node_lines({x: item.x2, y: item.y2}, {x: item.x1, y: item.y1}, initial_offset, false);

	});
}
