var rocky = require('rocky');

var dataLogs = [];
var memoryPressureHitCount = 0;

// Triggered when memory pressure is an issue
rocky.on('memorypressure', function(event) {
  switch(event.level) {
    case 'high':
      // Memory pressure is high, free some memory
      dataLogs = [];
      console.log('relieved the pressure');
      memoryPressureHitCount++;
      break;
    case 'normal':
    case 'low':
      // Not yet implemented
      break;
  }
  console.log('memory pressure occurred. level=' + event.level);
});

rocky.on('secondchange', function(event) {
  rocky.requestDraw();
  if(event.date.getSeconds() % 5 === 0) {
    // Fill array to increase memory pressure
    for(var i=0;i<100;i++) {
      dataLogs.push([event.date, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.']);
    }
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
  var text = new Date().toLocaleTimeString() + '\nPressureHits: ' + memoryPressureHitCount;
  ctx.fillText(text, w / 2, h / 2, w);
});
