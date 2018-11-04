// Here is were position data from vision is chopped into values that
// form the shape to be printed

// Take center points of shapes from vision.js
// Calculate the shortest path between shapes and decide closed neighbor 
// for each shape

// Cuerdas, only creates a connection between shapes, to its closest neighbor
// Smae neighbor pairing can not be repeated

// After pairs of neighbors are made strings are created between them based on 
// parameters
// This can be done directly into a GCODE string

function closest_neighbor() {
	// Calculate neighbor for each shape
	shapes.forEach(function (item, index, arr) {
	//console.log(item);
	
		var distances = []; // between on point an the rest

		// calculating distances
		for (var i = 0; i < shapes.length ; i++) {
			let delta_x = item.x - shapes[i].x;
			let delta_y = item.y - shapes[i].y;

			//console.log("delta_x = item.x - shapes[i+1].x = " +  item.x + " - " + shapes[i+1].x + " = " + delta_x);
			//console.log("delta_y = item.y - shapes[i+1].y = " +  item.y + " - " + shapes[i+1].y + " = " + delta_y);

			distances[i] = Math.sqrt( delta_x*delta_x + delta_y*delta_y);

			//var next_shape_idx = i+1;
			//console.log("distance ["+ index +" to "+ next_shape_idx + "] = " + distances[i]);
		}

		// Look for smallest distance and assign it as neighbor
		shapes[index].neighbor = index_of_min(distances, 0);

		draw_points();
	});
}

// Searches for the minimum value position

function index_of_min(arr, ) {
    if (arr.length === 0) {
        return -1;
    }

    let min = 0;

    console.log(arr);
    
    // Set initial min value different from zero
    if (arr[0] != 0) {
    	min = arr[0];
    } else {
    	min = arr[1];
    }

    var min_idx = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= min && arr[i] != 0) {
            min_idx = i;
            min = arr[i];
        }
        console.log("i = "+ i + "; min_idx = " + min_idx + "; arr[i] = " + arr[i]);
    }
    console.log("min_idx = " + min_idx);
    return min_idx;
}

closest_neighbor();