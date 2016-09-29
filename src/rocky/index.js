var rocky = require('rocky');

var dataLogs = [];

// Triggered when memory pressure is an issue
rocky.on('memorypressure', function(event) {
  switch(event.level) {
    case 'high':
      // Memory pressure is high, free some memory
      dataLogs = [];
      console.log('relieved the pressure');
      break;
    case 'normal':
    case 'low':
      // Not implemented
      break;
  }
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
  // Fill the logs to increase memory pressure
  for(var i=0;i<250;i++) {
    dataLogs.push([new Date(), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.']);
  }
});

// Draw the current time on screen
rocky.on('draw', function(event) {
  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(new Date().toLocaleTimeString(), w / 2, h / 2, w);
});
