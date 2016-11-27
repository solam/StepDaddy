var HiHat = require('../index');
var hiHat;

var ct = 0;

window.reset = function reset() {
  if (window.context) {
    window.context.close();
  }
  var context = new AudioContext();
  window.context = context;
  hiHat = HiHat(context);
}
reset();

document.getElementById('play').addEventListener('click', function(e) {
  if (ct % 100 === 0) {
    console.log(ct);
  }
  ct++;

  var hiHatNode = hiHat();
  hiHatNode.duration = parseFloat(document.getElementById('duration').value);

  hiHatNode.connect(context.destination);
  hiHatNode.start(context.currentTime + 0.01);
});

var interval = false;
document.getElementById('loop').addEventListener('click', function(e) {
  if (typeof interval === 'number') {
    clearInterval(interval);
    interval = false;
  } else {
    interval = setInterval(function() {
      document.getElementById('play').click();
    }, 200);
    document.getElementById('play').click();
  }
});
