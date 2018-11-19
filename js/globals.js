// Global variables shared btw js
// Global variables shared with paperscript

// Shapes center point
let shapes = [
  { x: 50, 
    y: 200,
    neighbor: -1
  }
];


// Strings is the number of source lines between lines, does not include duplicated connection between shapes (shapes that share 
// neighbor aka round trips)
let strings = [
{
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}
];

//shapes.push({x: 100, y: 200, neighbor: -1});
//shapes.push({x: 300, y: 200, neighbor: -1});
//shapes.push({x: 155, y: 200, neighbor: -1});
//shapes.push({x: 570, y: 360, neighbor: -1});

// Input params

let design_params = {
  nodes_num: 0,
  strings_num: 0,
  strings_spacing: 0,
  'update': function () {
    this.nodes_num = parseInt(document.getElementById("nodes_num").value);
    this.strings_num = parseInt(document.getElementById("strings_num").value);
    this.strings_spacing = parseInt(document.getElementById("strings_spacing").value);
  }
}

let printing_params = {
  initial_height: 0,
  speed: 0,
  e_speed: 0,
  nozzle_diam: 0,
  cartridge_diam: 0,
  extrusion_mult: 0,
  retraction: 1,
  nozzle_material_surface_ratio: 0,
  e: 0,
  last_p: {x: 0, y: 0},
  'update': function () {
    this.initial_height = parseFloat(document.getElementById("initial_height").value);
    this.speed = parseFloat(document.getElementById("speed").value);
    this.e_speed = parseFloat(document.getElementById("e_speed").value); 
    this.nozzle_diam = parseFloat(document.getElementById("nozzle_diam").value);
    this.cartridge_diam = parseFloat(document.getElementById("cartridge_diam").value);
    this.extrusion_mult = parseFloat(document.getElementById("extrusion_mult").value);
    this.retraction = parseFloat(document.getElementById("retraction").value);
    this.nozzle_material_surface_ratio = ( Math.PI * Math.pow((this.nozzle_diam/2),2) ) / ( Math.PI * Math.pow((this.cartridge_diam/2),2) );
  }
}

function init_globals(){

// Handling events
// Parameters Events handler
document.getElementById('params').addEventListener('change', eventChangeHandler);
function eventChangeHandler(e) {
  if (e.target !== e.currentTarget) {
    var item = e.target.id;
    design_params.update();
    printing_params.update();

    draw_lines();
    }
    e.stopPropagation();
  }

  design_params.update();
  printing_params.update();

}