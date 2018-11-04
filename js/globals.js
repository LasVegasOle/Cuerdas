// Global variables shared btw js
// Global variables shared with paperscript

// Shapes center point
let shapes = [
  { x: 0, 
    y: 0,
    neighbor: 0
  }
];

shapes[0].x = 3;

/*window.globals = {
    array_line_2d: [],
    open_line: true, 
    epsilon: 5,  // Curve degreess 5 fine
    flatten_size: 2.5,
    debug: false, // not saving file
    call_array_2d_to_3d: function() { array_2d_to_3d(); },
    draw_line: function() { draw_line(); }
};
// Object that holds all the user configuration parameters
var parameters = {
  layer_height: 0,
  width_x: 0,
  length_y: 0,
  height_z: 0,
  num_of_layers: 0,
  first_height: 0,
  delta_x: 0,
  total_rotation: 0,
  layer_rotation: 0,
  top_layer_scale: 0,
  extrusion_radius: 0,  // This parameters is for ThreeJS Cyilinders radius
  center_x: 0,
  center_y: 0,
  continuous_path: true,
  material_diameter: 0,
  nozzle_diameter: 0,
  nozzle_material_surfaces_ratio: 0,
  feedrate: 0,
  delay: 0,
  'update': function() {
    this.width_x = parseFloat(document.getElementById("width_x").value);
    //this.length_y = parseFloat(document.getElementById("length_y").value);
    this.height_z = parseFloat(document.getElementById("height_z").value);
    this.layer_height = parseFloat(document.getElementById("layer_height").value);
    this.num_of_layers = this.height_z/this.layer_height;
    this.first_height = parseFloat(document.getElementById("first_height").value);
    this.total_rotation = parseFloat(document.getElementById("layer_rotation").value);
    this.layer_rotation = parseFloat(this.total_rotation/this.num_of_layers);
    this.top_layer_scale = parseFloat(document.getElementById("top_layer_scale").value);
    this.extrusion_radius = this.layer_height/2;
    this.center_x = parseFloat(document.getElementById("center_x").value);
    this.center_y = parseFloat(document.getElementById("center_y").value);
    this.feedrate = 60 * parseFloat(document.getElementById("feedrate").value); // from mm/s to mm/min
    this.delay = parseFloat(document.getElementById("delay").value);
    this.material_diameter = parseFloat(document.getElementById("material_diameter").value);
    this.nozzle_diameter = parseFloat(document.getElementById("nozzle_diameter").value);
    var nozzle_surface = Math.PI * Math.pow((this.nozzle_diameter/2),2);
    var material_surface = Math.PI * Math.pow((this.material_diameter/2),2);
    //console.log("Nozzle surface = " + nozzle_surface + ", Material Surface = " + material_surface);
    this.nozzle_material_surfaces_ratio = nozzle_surface / material_surface;
    //console.log("nozzle material surface ratio = " + this.nozzle_material_surfaces_ratio);
  }
}*/