// This handles the app portion in charge of tracking elements in the video

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ColorTracker(['yellow']);

  tracking.track('#video', tracker, { camera: true, fps:2 });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      // saving points data
      addShape();
      
      // delete all shapes after each color scan!
      // A.length = 0 empty an array frast everytime we start

    });
  });
};

function addShape(argument) {
	// Make sure we are not reading same shape
}