// This file creates and safes into a file our GCODE

function center_and_scale_string_points(multiplier) {

	let x_offset = canvas.width/2;
	let y_offset = canvas.height/2;

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

function build_gcode(){
	var gcode = [];

	// Transform strings points to printer coordinates (center 0,0 and scale)
	let print_strings = center_and_scale_string_points(1);



	// Differenciate printing movements versus "move to no printing" 

	// Calculate extrusion distance

	// Homing
	gcode += "G28 \n";



	strings.forEach(function(item, index) {

		
	});

	// Iterate strings
		// Move to string
		// Print string
			// Retraction
			// Zlift

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