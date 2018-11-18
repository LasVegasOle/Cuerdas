// This handles the app portion in charge of tracking elements in the video

function init_vision() {
  var video = document.getElementById('video');
  
  var tracker = new tracking.ColorTracker(['cyan']);

  tracking.track('#video', tracker, { camera: true, fps:10 });

  tracker.on('track', function(event) {
    
    // clear shapes
    shapes.length = 0;

    event.data.forEach(function(rect) {
      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      // Shape detected center with origin at the center
      var x_center = rect.x + rect.width/2;  
      var y_center = rect.y + rect.height/2;

      //console.log("RECT x = " + rect.x + ", y = " + rect.x);
      //console.log("WH x = " + rect.width + ", y = " + rect.width);

      // mirroring points
      // Flip y


      shapes.push({x: x_center,y: y_center, neighbor: 0});
    });

    closest_neighbor();  // logic.js
    shapes_to_strings();
    draw_lines();
  });
}
