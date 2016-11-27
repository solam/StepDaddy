module.exports = function(context) {
  var playingNodes = [];
  return function() {
    var osc = context.createOscillator();
    var gain = context.createGain();
    var choke = context.createGain();
    gain.value = 0;

    gain.frequency = 2450;
    gain.duration = 0.2;

    osc.connect(choke);

    var volume = context.createGain();
    volume.gain.value = 0.11;
    choke.connect(volume);
    volume.connect(gain);

    gain.start = function(when) {

      while (playingNodes.length) {
        playingNodes.pop().stop(when);
      }
      playingNodes.push(gain);

      osc.frequency.value = gain.frequency;

      gain.gain.setValueAtTime(0.00001, when + 0.0001);
      gain.gain.exponentialRampToValueAtTime(0.3, when + 0.0005);
      gain.gain.exponentialRampToValueAtTime(0.00001, when + gain.duration);

      osc.start(when);
      osc.stop(when + gain.duration);
      osc.onended = function() {
        osc.disconnect(choke);
      };

    };
    gain.stop = function(when) {
      choke.gain.setValueAtTime(1, when);
      choke.gain.linearRampToValueAtTime(0, when + 0.0001);
    }
    return gain;
  };
};
