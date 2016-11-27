var Envelope = require('instruments/jsdrumsynth/envelope-generator/index');

module.exports = function(context) {

  var playingNodes = [];
  var fundamental = 80;
  var ratios = [1, 1.5, 2.08, 2.715, 3.395, 4.105];

  return function(open) {

    // Highpass
    var highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 7000;


    // Bandpass
    var bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;
    bandpass.connect(highpass);

    var audioNode = context.createGain();
    var preChoke = context.createGain();
    preChoke.gain.value = 0;
    var postChoke = context.createGain();
    postChoke.gain.value = 0;

    var volume = context.createGain();
    volume.gain.value = 0.4;


    if (open) {
      audioNode.duration = 1.3;
    } else {
      audioNode.duration = 0.1;
    }


    var gainNode = context.createGain();
    gainNode.gain.value = 0;


    gainNode.connect(bandpass);
    highpass.connect(postChoke);
    postChoke.connect(volume);
    volume.connect(audioNode);


    // Create the oscillators
    var oscs = ratios.map(function(ratio) {
      var osc = context.createOscillator();
      osc.type = "square";
      // Frequency is the fundamental * this oscillator's ratio
      osc.frequency.value = fundamental * ratio;
      osc.connect(preChoke);
      return osc;
    });

    preChoke.connect(gainNode);

    audioNode.start = function(when) {

      while (playingNodes.length) {
        playingNodes.pop().stop(when);
      }
      playingNodes.push(audioNode);


      preChoke.gain.setValueAtTime(0, when + 0.0001);
      preChoke.gain.linearRampToValueAtTime(1, when + 0.0002);
      postChoke.gain.setValueAtTime(0, when + 0.0001);
      postChoke.gain.linearRampToValueAtTime(1, when + 0.0002);


      var envSettings = {
        curve: 'exponential',
        attackTime: 0.0001,
        attackCurve: 'linear',
        sustainLevel: 0.3,
        decayTime: 0.02,
      };
      envSettings.releaseTime = audioNode.duration - envSettings.attackTime - envSettings.decayTime;
      var env = new Envelope(context, envSettings);
      env.connect(gainNode.gain);


      env.start(when);
      env.release(when + envSettings.attackTime + envSettings.decayTime);
      var stopAt = env.getReleaseCompleteTime()
      env.stop(stopAt);
      oscs.forEach(function(osc) {
        osc.start(when);
        osc.stop(stopAt);
      });


      // Disconnect audioNode when convenient to ensure its cleanup
      oscs[0].onended = function() {
        highpass.disconnect(postChoke);
        audioNode.disconnect();
      };
    };

    audioNode.stop = function(when) {
      preChoke.gain
        .setValueAtTime(1, when);
      preChoke.gain
        .linearRampToValueAtTime(0, when + 0.0001);
      postChoke.gain
        .setValueAtTime(1, when);
      postChoke.gain
        .linearRampToValueAtTime(0, when + 0.0001);
      audioNode.gain
        .setValueAtTime(1, when);
      audioNode.gain
        .linearRampToValueAtTime(0, when + 0.0001);
    };

    return audioNode;
  };
};
