// This file creates and safes into a file our GCODE

function build_gcode(){
	var gcode = [];
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
	
	return gcode;
}

function create_file(){
  var output = get_parameters();
  output += build_gcode();
  //console.log(output);
  var GCodeFile = new Blob([output], {type: 'text/plain'});
  saveAs(GCodeFile, "Strings" + '.gcode');
}

function get_parameters(){
var params = [];
  params += "; GCode generated with Cuerdas dots from www.3digitalcooks.com \n";
  params += "; Number of nodes [#]: " + document.getElementById("num_nodes").value + "\n";
  params += "; Number of strings [#]: " + document.getElementById("num_strings").value + "\n";
  params += "; Stings spacing [mm]: " + document.getElementById("strings_spacing").value + "\n";
  params += "; Initial height [mm]: " + document.getElementById("initial_height").value + "\n";
  params += "; Speed [mm/min]: " + document.getElementById("speed").value + "\n"; 
  params += "; Extruder speed [mm/min]: " + document.getElementById("e_speed").value + "\n"; 
  params += "; Nozzle diameter [mm]: " + document.getElementById("nozzle_diam").value + "\n";
  params += "; Cartridge diameter [mm]: " + document.getElementById("cartridge_diam").value + "\n";
  params += "; Extrusion multiplier [#]: " + document.getElementById("extrusion_mult").value + "\n"; 
  params += "; Retraction [mm]: " + document.getElementById("retraction").value + "\n";  
return params;
}