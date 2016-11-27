var makeDistortionCurve = require('make-distortion-curve');
var curve = makeDistortionCurve(1024);


// partially informed by the rather odd http://www.kvraudio.com/forum/viewtopic.php?t=383536
module.exports = function(context) {

  var playingNodes = [];



  return function() {

    var distortion = context.createWaveShaper();
    distortion.curve = curve;

    var highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 700;

    distortion.connect(highpass);


    var preChoke = context.createGain();
    preChoke.gain.value = 0;
    var postChoke = context.createGain();
    postChoke.gain.value = 0;

    var duration = 0.05;

    var gain = context.createGain();

    gain.start = function(when) {

      while (playingNodes.length) {
        playingNodes.pop().stop(when);
      }
      playingNodes.push(gain);

      preChoke.gain.setValueAtTime(0, when + 0.0001);
      preChoke.gain.linearRampToValueAtTime(1, when + 0.0002);
      postChoke.gain.setValueAtTime(0, when + 0.0001);
      postChoke.gain.linearRampToValueAtTime(1, when + 0.0002);

      preChoke.connect(distortion);
      highpass.connect(postChoke);
      postChoke.connect(gain);

      var oscs = [
        context.createOscillator(),
        context.createOscillator(),
        ];
      oscs.forEach(function(osc, i) {
        osc.type = "triangle";
        osc.connect(preChoke);
        osc.start(when);
        osc.stop(when + duration);
        switch (i) {
          case 0:
            osc.frequency.value = 500;
            break;
          case 1:
            osc.frequency.value = 1720;
            break;
        }
      });
      oscs[0].onended = function() {
        highpass.disconnect(postChoke);
      };

      gain.gain.setValueAtTime(0.8, when);
      gain.gain.exponentialRampToValueAtTime(0.00001, when + duration);
    };

    gain.stop = function(when) {
      preChoke.gain.setValueAtTime(1, when);
      preChoke.gain.linearRampToValueAtTime(0, when + 0.0001);
      postChoke.gain.setValueAtTime(1, when);
      postChoke.gain.linearRampToValueAtTime(0, when + 0.0001);
    };
    return gain;
  };
};

