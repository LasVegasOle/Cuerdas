// This handles the app portion in charge of tracking elements in the video

window.onload = function() {
  var video = document.getElementById('video');
  
  var tracker = new tracking.ColorTracker(['yellow']);

  tracking.track('#video', tracker, { camera: true, fps:2 });

  tracker.on('track', function(event) {
    
    // clear shapes
    shapes.length = 0;

    event.data.forEach(function(rect) {
      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      // Shape detected center with origin at the center
      var x_center = rect.x - rect.width/2;  
      var y_center = rect.y - rect.height/2;

      shapes.push({x: x_center,y: y_center, neighbor: 0});
    });

    closest_neighbor();  // logic.js
  });
};
