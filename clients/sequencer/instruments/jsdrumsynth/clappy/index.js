var NoiseBuffer = require('instruments/jsdrumsynth/noise-buffer/index');
var buffer = NoiseBuffer(1);

module.exports = function(context) {

  var duration = 1.2;
  var cycles = 3;
  var clapFrequency = 80;
  var clapLength = cycles / clapFrequency;

  var bandpass = context.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 800;
  bandpass.Q.value = 0.7;

  var highpass = context.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 600;
  bandpass.connect(highpass);

  var playingNodes = [];

  return function() {

    /*
      All this does is feed white noise
      through two paths: one short burst
      that goes through an envelope mod-
      ified by an LFO at 80hz, simulat-
      ing a few rapid claps, and a long-
      er burst that simulates the rever-
      beration of the claps through the
      room.
    */

    var audioNode = context.createGain();


    var preChoke = context.createGain();
    preChoke.gain.value = 0;
    var postChoke = context.createGain();
    postChoke.gain.value = 0;

    preChoke.connect(bandpass);
    postChoke.connect(audioNode);



    var noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    var clapDryEnvelope = context.createGain();
    clapDryEnvelope.gain.value = 0;

    var clapDecayEnvelope = context.createGain();
    clapDecayEnvelope.gain.value = 0;

    var lfoCarrier = context.createGain();
    var lfo = context.createOscillator();
    lfo.type = "sawtooth";
    lfo.frequency.value = clapFrequency;
    lfo.connect(lfoCarrier.gain);


    noise.connect(clapDryEnvelope);
    clapDryEnvelope.connect(lfoCarrier);
    lfoCarrier.connect(preChoke);

    noise.connect(clapDecayEnvelope);
    clapDecayEnvelope.connect(preChoke);

    highpass.connect(postChoke);



    audioNode.start = function(when) {

      while (playingNodes.length) {
        playingNodes.pop().stop(when);
      }
      playingNodes.push(audioNode);

      preChoke.gain.setValueAtTime(0, when + 0.0001);
      preChoke.gain.linearRampToValueAtTime(1, when + 0.0002);
      postChoke.gain.setValueAtTime(0, when + 0.0001);
      postChoke.gain.linearRampToValueAtTime(1, when + 0.0002);

      clapDryEnvelope.gain.setValueAtTime(0.0001, when);
      clapDryEnvelope.gain.exponentialRampToValueAtTime(1, when + 0.001);
      clapDryEnvelope.gain.linearRampToValueAtTime(1, when + clapLength);
      clapDryEnvelope.gain.exponentialRampToValueAtTime(0.000000001, when + clapLength + 0.01);
      clapDryEnvelope.gain.setValueAtTime(0, when + clapLength + 0.02);

      clapDecayEnvelope.gain.setValueAtTime(0.0001, when);
      clapDecayEnvelope.gain.setValueAtTime(0.0001, when + clapLength);
      clapDecayEnvelope.gain.exponentialRampToValueAtTime(1, when + clapLength + 0.001);
      clapDecayEnvelope.gain.exponentialRampToValueAtTime(0.2, when + 0.1);
      clapDecayEnvelope.gain.exponentialRampToValueAtTime(0.000000001, when + duration);
      clapDecayEnvelope.gain.setValueAtTime(0, when + duration + 0.01);

      lfo.start(when);
      lfo.stop(when + duration);
      noise.start(when, Math.random() * noise.buffer.duration);
      noise.stop(when + duration);
      audioNode.gain.setValueAtTime(0, when + duration);

      noise.onended = function() {
        audioNode.disconnect();
      };

    };

    audioNode.stop = function(when) {
      preChoke.gain.setValueAtTime(1, when);
      preChoke.gain.linearRampToValueAtTime(0, when + 0.0001);
      postChoke.gain.setValueAtTime(1, when);
      postChoke.gain.linearRampToValueAtTime(0, when + 0.0001);


      try {
        lfo.stop(when);
      } catch(e) {
        // likely already stopped
      }
      try {
        noise.stop(when);
      } catch(e) {
        // likely already stopped
      }
    };

    return audioNode;
  };
};
