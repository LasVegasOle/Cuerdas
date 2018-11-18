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

	// Calculate extrude length

	let x = x1 + canvas.width/2; 
	let y = y2 + canvas.height/2;
	let xx =x2 + canvas.width/2;
	let yy = y2 + canvas.height/2;
	
	// Calculate extrusion value
	var distance = Math.sqrt(Math.pow( x-xx ,2) + Math.pow( y-yy,2 ));
	console.log("distance = "+ distance);
	printing_params.e += distance * printing_params.nozzle_material_surface_ratio * printing_params.extrusion_mult;
 
 	// Move to initial point
	gc += "G1 X" + x + " Y" + y + " F" + printing_params.speed + " \n";

	// Go to end point extruding
	gc += "G1 X" + xx + " Y" + yy + " E"+  Math.round(10000 * printing_params.e) / 10000 + " F" + printing_params.speed + " \n";

	return gc;

}


function build_gcode(){
	var gcode = [];

	// Transform strings points to printer coordinates (center 0,0 and scale)
	let print_strings = center_and_scale_string_points(1);



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
		
		// Move to first point of the string
		gcode += "G1 X" + item.x1 + " Y" + item.y1 + " Z" + printing_params.initial_height + " F" + printing_params.speed + " \n"; 

		// Read inputs, odd?
		if(strings_num%2) {
			// odd number
			//console.log("ODD!");
			gcode += gcode_line(item.x1, item.y1, item.x2, item.y2);
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
		//gcode_node_lines({x: item.x1, y: item.y1}, {x: item.x2, y: item.y2}, initial_offset, true);

		//console.log("\n~~~~ NEGATIVE STRINGS ~~~~ ");
		// Negative direction strings
		//gcode_node_lines({x: item.x2, y: item.y2}, {x: item.x1, y: item.y1}, initial_offset, false);

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
  //saveAs(GCodeFile, "Strings" + '.gcode');
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