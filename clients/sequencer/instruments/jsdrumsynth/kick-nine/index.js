var NoiseBuffer = require('instruments/jsdrumsynth/noise-buffer/index');
var makeDistortionCurve = require('instruments/jsdrumsynth/make-distortion-curve/index');

module.exports = function(context) {
  var lastNode;
  return function() {
    var node = context.createGain();

    var osc = context.createOscillator();
    osc.type = "sine";
    osc.connect(node);

    var distortion = context.createWaveShaper();
    distortion.curve = makeDistortionCurve(2);
    distortion.oversample = '4x';

    osc.connect(distortion);
    distortion.connect(node);

    var noiseSource = context.createBufferSource();
    noiseSource.buffer = NoiseBuffer(0.2);

    var noiseLowpass = context.createBiquadFilter();
    noiseLowpass.type = "lowpass";
    noiseLowpass.frequency.value = 1000;

    var noisePath = context.createGain();
    noisePath.connect(node);
    noiseSource.connect(noiseLowpass);
    noiseLowpass.connect(noisePath);

    node.start = function(when) {

      if (typeof when !== 'number') {
        when = context.currentTime;
      }
      if (lastNode && lastNode.stop && lastNode !== node) {
        lastNode.stop(when);
      }
      lastNode = node;
      node.gain.setValueAtTime(1, when);
      node.gain.exponentialRampToValueAtTime(0.0001, when + 1.2)

      osc.start(when);
      osc.frequency.setValueAtTime(200, when);
      osc.frequency.exponentialRampToValueAtTime(55, when + 0.1);
      osc.stop(when + 1.2);

      noiseSource.start(when);
      noisePath.gain.exponentialRampToValueAtTime(0.0001, when + 0.003);


    };
    node.stop = function(when) {
      if (typeof when !== 'number') {
        when = context.currentTime;
      }
      osc.stop(when);
    };
    return node;
  };

};
