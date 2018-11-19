// This file creates and safes into a file our GCODE

function center_and_scale_string_points(multiplier) {

	let x_offset = canvas.width/2;
	let y_offset = canvas.height/2;

	// Make a deep clone of the strings array
	let print_strings = JSON.parse(JSON.stringify(strings));

	// centering points, 0x0 center image
	print_strings.forEach(function(item){
		item.x1 -= x_offset;
		item.x2 -= x_offset;
		item.y1 -= y_offset;
		item.y2 -= y_offset;

		item.x1 *= multiplier;
		item.x2 *= multiplier;
		item.y1 *= multiplier;
		item.y2 *= multiplier;
	});

	console.log(print_strings);

	return print_strings;
}

function gcode_line(x1, y1, x2, y2) {

	let gc = [];

	let move_x = Math.round(100 * x1)/100;
	let move_y = Math.round(100 * y1)/100;

 	// Move to initial point, no extrusion, only move if we are not there yet!
 	if ( ( move_x != printing_params.last_p.x ) || ( move_y != printing_params.last_p.y ) ) {

 		// Retraction
 		printing_params.e -= printing_params.retraction;
 		gc += "G1 E" + Math.round(10000 * printing_params.e)/10000 + " F" + printing_params.e_speed + " \n";

 		// Zlift to avoid crush printed parts, 2 hardcoded zlift = 2
 		let z = printing_params.initial_height + 2;
 		gc += "G1 Z" + z + " F" + printing_params.speed + " \n";

 		// movement Gcode
		gc += "G1 X" + move_x + 
				" Y" + move_y + 
				" F" + printing_params.speed + " \n";
	
		// Zlift down
 		gc += "G1 Z" + printing_params.initial_height + " F" + printing_params.speed + " \n";

		// Revert retraction
 		printing_params.e += printing_params.retraction;
 		gc += "G1 E" + Math.round(10000 * printing_params.e)/10000 + " F" + printing_params.e_speed + " \n";

	}


	printing_params.last_p.x = Math.round(100 * x2)/100; 
	printing_params.last_p.y = Math.round(100 * y2)/100; 

	// Calculate extrude length
	var distance = Math.sqrt(Math.pow( x1-x2 ,2) + Math.pow( y1-y2,2 ));
	console.log("distance = "+ distance);

	printing_params.e += distance * printing_params.nozzle_material_surface_ratio * printing_params.extrusion_mult;


	// Go to end point extruding
	gc += "G1 X" + printing_params.last_p.x + 
			" Y" + printing_params.last_p.y + 
			" E"+  Math.round(10000 * printing_params.e) / 10000 + 
			" F" + printing_params.speed + " \n";

	return gc;
}

function gcode_node_lines(p_start, p_end, initial_offset, positive) {

	let gc = [];
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

				gc += ";+ ODD; sign = " +sign + " j = " + j + ", p_x = " + p_node.x + ", p_y = " + p_node.y + "; t_x = " + t.x + "; t_y = " + t.y + " \n";
				gc += gcode_line(p_node.x, p_node.y, t.x, t.y);
				//draw_circle(t.x, t.y);
				//console.log("spacing = " + spacing);

			} else {
				// flip sign for multiple nodes
				let multy_node_sign = -1*sign;

				t = tangential_point(p_start.x, p_start.y, p_end.x, p_end.y, 
										j*2 - 1, design_params.nodes_num*2, 
										multy_node_sign*spacing);
				//draw_circle(t.x, t.y);
				gc += ";+ EVEN; sign = " +sign + ", j = " + j + ", p_x = " + p_node.x + ", p_y = " + p_node.y + "; t_x = " + t.x + "; t_y = " + t.y + " \n";
				gc += gcode_line(p_node.x, p_node.y, t.x, t.y);
			}
			p_node = t;
		}
		gc += ";Closing string; p1 x: " + p_node.x + ", p1 y: " + p_node.y + ", p2 x: " + p_end.x + ", p2 y: " + p_end.y + " \n";
		gc += gcode_line(p_node.x, p_node.y, p_end.x, p_end.y);
	}
	return gc;
}

function build_gcode(){
	var gcode = [];

	// Transform strings points to printer coordinates (center 0,0 and scale)
	let print_strings = center_and_scale_string_points(0.5);

	// Differenciate printing movements versus "move to no printing" 

	// Calculate extrusion distance

	// Homing
	gcode += "G28 \n";

	print_strings.forEach(function (item) {

		let strings_num = design_params.strings_num;
		let x1 = item.x1;
		let y1 = item.y1;
		let x2 = item.x2;
		let y2 = item.y2;
		let initial_offset = 0;
		
		gcode += "; Start new string, move to first point, zlift and retract \n";


 		// Retraction
 		printing_params.e -= printing_params.retraction;
 		gcode += "G1 E" + Math.round(10000 * printing_params.e)/10000 + " F" + printing_params.e_speed + " \n";

		// Zlift to avoid crush printed parts, 2 hardcoded zlift = 2
 		let z = printing_params.initial_height + 2;
 		gcode += "G1 Z" + z + " F" + printing_params.speed + " \n";

		// Move to first point of the string
		gcode += "G1 X" + item.x1 + " Y" + item.y1 + " F" + printing_params.speed + " \n"; 

		// Zlift down
 		gcode += "G1 Z" + printing_params.initial_height + " F" + printing_params.speed + " \n";

		// Revert retraction
 		printing_params.e += printing_params.retraction;
 		gcode += "G1 E" + Math.round(10000 * printing_params.e)/10000 + " F" + printing_params.e_speed + " \n";


		// update last point
		printing_params.last_p.x = Math.round(100 * item.x1)/100; 
		printing_params.last_p.y = Math.round(100 * item.y1)/100; 

		// Read inputs, odd?
		if(strings_num%2) {
			// odd number
			//console.log("ODD!");
			gcode += gcode_line(item.x1, item.y1, item.x2, item.y2);
			strings_num--;
			// invert points to draw doing a round tirp
			item.x2 = x1;
			item.y2 = y1;
			item.x1 = x2;
			item.y1 = y2;
		} else {
			// Even
			initial_offset = design_params.strings_spacing/2;
		}

		//console.log("\n~~~~ POSITIVE STRINGS ~~~~ ");

		// Postive direction strings
		gcode += gcode_node_lines({x: item.x1, y: item.y1}, {x: item.x2, y: item.y2}, initial_offset, true);

		//console.log("\n~~~~ NEGATIVE STRINGS ~~~~ ");
		// Negative direction strings
		gcode += gcode_node_lines({x: item.x2, y: item.y2}, {x: item.x1, y: item.y1}, initial_offset, false);

	});

	// End gcode homing printer
	gcode += "G28 \n";
	// Turn off motors
	gcode += "M84 \n";

	
	return gcode;
}

function create_file(){
  var output = get_parameters();
  output += build_gcode();
  console.log(output);
  var GCodeFile = new Blob([output], {type: 'text/plain'});
  saveAs(GCodeFile, "Strings" + '.gcode');
}

function get_parameters(){
var params = [];
  params += "; GCode generated with Cuerdas dots from www.3digitalcooks.com \n";
  params += "; Number of nodes [#]: " + design_params.nodes_num + "\n";
  params += "; Number of strings [#]: " + design_params.strings_num + "\n";
  params += "; Stings spacing [mm]: " + design_params.strings_spacing + "\n";
  params += "; Initial height [mm]: " + document.getElementById("initial_height").value + "\n";
  params += "; Speed [mm/min]: " + document.getElementById("speed").value + "\n"; 
  params += "; Extruder speed [mm/min]: " + document.getElementById("e_speed").value + "\n"; 
  params += "; Nozzle diameter [mm]: " + document.getElementById("nozzle_diam").value + "\n";
  params += "; Cartridge diameter [mm]: " + document.getElementById("cartridge_diam").value + "\n";
  params += "; Extrusion multiplier [#]: " + document.getElementById("extrusion_mult").value + "\n"; 
  params += "; Retraction [mm]: " + document.getElementById("retraction").value + "\n";  
return params;
}