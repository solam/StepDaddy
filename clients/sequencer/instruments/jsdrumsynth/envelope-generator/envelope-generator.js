'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create an envelope generator that
 * can be attached to an AudioParam
 */

var Envelope = function () {
  function Envelope(context, settings) {
    _classCallCheck(this, Envelope);

    // Hold on to these
    this.context = context;
    this.settings = settings;

    this._setDefaults();

    // Create nodes
    this.source = this._getOnesBufferSource();
    this.attackDecayNode = context.createGain();
    this.releaseNode = context.createGain();
    this.ampNode = context.createGain();
    this.outputNode = context.createGain();

    this.outputNode.gain.value = this.settings.startLevel;
    this.ampNode.gain.value = this.settings.maxLevel - this.settings.startLevel;

    // Set up graph
    this.source.connect(this.attackDecayNode);
    this.source.connect(this.outputNode);
    this.attackDecayNode.connect(this.releaseNode);
    this.releaseNode.connect(this.ampNode);
    this.ampNode.connect(this.outputNode.gain);
  }

  /**
   * Deal w/ settings object
   */


  _createClass(Envelope, [{
    key: '_setDefaults',
    value: function _setDefaults() {

      // curve
      if (typeof this.settings.curve !== 'string') {
        this.settings.curve = 'linear';
      }

      // delayTime
      if (typeof this.settings.delayTime !== 'number') {
        this.settings.delayTime = 0;
      }

      // startLevel
      if (typeof this.settings.startLevel !== 'number') {
        this.settings.startLevel = 0;
      }
      // maxLevel
      if (typeof this.settings.maxLevel !== 'number') {
        this.settings.maxLevel = 1;
      }

      // sustainLevel
      if (typeof this.settings.sustainLevel !== 'number') {
        this.settings.sustainLevel = 1;
      }

      // attackTime
      if (typeof this.settings.attackTime !== 'number') {
        this.settings.attackTime = 0;
      }

      // holdTime
      if (typeof this.settings.holdTime !== 'number') {
        this.settings.holdTime = 0;
      }

      // decayTime
      if (typeof this.settings.decayTime !== 'number') {
        this.settings.decayTime = 0;
      }

      // releaseTime
      if (typeof this.settings.releaseTime !== 'number') {
        this.settings.releaseTime = 0;
      }

      // startLevel must not be zero if attack curve is exponential
      if (this.settings.startLevel === 0 && this._getRampMethodName('attack') === 'exponentialRampToValueAtTime') {
        if (this.settings.maxLevel < 0) {
          this.settings.startLevel = -0.001;
        } else {
          this.settings.startLevel = 0.001;
        }
      }

      // maxLevel must not be zero if attack, decay, or release curve is exponential
      if (this.settings.maxLevel === 0 && (this._getRampMethodName('attack') === 'exponentialRampToValueAtTime' || this._getRampMethodName('decay') === 'exponentialRampToValueAtTime' || this._getRampMethodName('release') === 'exponentialRampToValueAtTime')) {
        if (this.settings.startLevel < 0) {
          this.settings.maxLevel = -0.001;
        } else {
          this.settings.maxLevel = 0.001;
        }
      }

      // sustainLevel must not be zero if decay or release curve is exponential
      if (this.settings.sustainLevel === 0 && (this._getRampMethodName('decay') === 'exponentialRampToValueAtTime' || this._getRampMethodName('release') === 'exponentialRampToValueAtTime')) {
        // No need to be negative here as it's a multiplier
        this.settings.sustainLevel = 0.001;
      }

      // decayTime must not be zero to avoid colliding with attack curve events
      if (this.settings.decayTime === 0) {

        this.settings.decayTime = 0.001;
      }
    }

    /**
     * Get an audio source that will be pegged at 1,
     * providing a signal through our path that can
     * drive the AudioParam this is attached to.
     * TODO: Can we always cache this?
     */

  }, {
    key: '_getOnesBufferSource',
    value: function _getOnesBufferSource() {
      var context = this.context;

      // Generate buffer, setting its samples to 1
      // Needs to be 2 for safari!
      // Hat tip to https://github.com/mmckegg/adsr
      var onesBuffer = context.createBuffer(1, 2, context.sampleRate);
      var data = onesBuffer.getChannelData(0);
      data[0] = 1;
      data[1] = 1;

      // Create a source for the buffer, looping it
      var source = context.createBufferSource();
      source.buffer = onesBuffer;
      source.loop = true;

      return source;
    }

    /**
     * Connect the end of the path to the
     * targetParam.
     *
     * TODO: Throw error when not an AudioParam target?
     */

  }, {
    key: 'connect',
    value: function connect(targetParam) {
      this.outputNode.connect(targetParam);
    }

    /**
     * Begin the envelope, scheduling everything we know
     * (attack time, decay time, sustain level).
     */

  }, {
    key: 'start',
    value: function start(when) {

      var attackRampMethodName = this._getRampMethodName('attack');
      var decayRampMethodName = this._getRampMethodName('decay');

      var attackStartsAt = when + this.settings.delayTime;
      var attackEndsAt = attackStartsAt + this.settings.attackTime;
      var decayStartsAt = attackEndsAt + this.settings.holdTime;
      var decayEndsAt = decayStartsAt + this.settings.decayTime;

      var attackStartLevel = 0;
      if (attackRampMethodName === "exponentialRampToValueAtTime") {
        attackStartLevel = 0.001;
      }

      this.attackDecayNode.gain.setValueAtTime(attackStartLevel, when);
      this.attackDecayNode.gain.setValueAtTime(attackStartLevel, attackStartsAt);
      this.attackDecayNode.gain[attackRampMethodName](1, attackEndsAt);
      this.attackDecayNode.gain.setValueAtTime(1, decayStartsAt);
      this.attackDecayNode.gain[decayRampMethodName](this.settings.sustainLevel, decayEndsAt);

      this.source.start(when);
    }

    /**
     * Return  either linear or exponential
     * ramp method names based on a general
     * 'curve' setting, which is overridden
     * on a per-stage basis by 'attackCurve',
     * 'decayCurve', and 'releaseCurve',
     * all of which can be set to values of
     * either 'linear' or 'exponential'.
     */

  }, {
    key: '_getRampMethodName',
    value: function _getRampMethodName(stage) {
      var exponential = 'exponentialRampToValueAtTime';
      var linear = 'linearRampToValueAtTime';

      // Handle general case
      var generalRampMethodName = linear;
      if (this.settings.curve === 'exponential') {
        generalRampMethodName = exponential;
      }

      switch (stage) {
        case 'attack':
          if (this.settings.attackCurve) {
            if (this.settings.attackCurve === 'exponential') {
              return exponential;
            } else if (this.settings.attackCurve === 'linear') {
              return linear;
            }
          }
          break;
        case 'decay':
          if (this.settings.decayCurve) {
            if (this.settings.decayCurve === 'exponential') {
              return exponential;
            } else if (this.settings.decayCurve === 'linear') {
              return linear;
            }
          }
          break;
        case 'release':
          if (this.settings.releaseCurve) {
            if (this.settings.releaseCurve === 'exponential') {
              return exponential;
            } else if (this.settings.releaseCurve === 'linear') {
              return linear;
            }
          }
          break;
        default:
          break;
      }
      return generalRampMethodName;
    }

    /**
     * End the envelope, scheduling what we didn't know before
     * (release time)
     */

  }, {
    key: 'release',
    value: function release(when) {
      this.releasedAt = when;
      var releaseEndsAt = this.releasedAt + this.settings.releaseTime;

      var rampMethodName = this._getRampMethodName('release');

      var releaseTargetLevel = 0;

      if (rampMethodName === "exponentialRampToValueAtTime") {
        releaseTargetLevel = 0.001;
      }

      this.releaseNode.gain.setValueAtTime(1, when);
      this.releaseNode.gain[rampMethodName](releaseTargetLevel, releaseEndsAt);
    }
  }, {
    key: 'stop',
    value: function stop(when) {
      this.source.stop(when);
    }

    /**
     * Provide a helper for consumers to
     * know when the release is finished,
     * so that a source can be stopped.
     */

  }, {
    key: 'getReleaseCompleteTime',
    value: function getReleaseCompleteTime() {
      if (typeof this.releasedAt !== 'number') {
        throw new Error("Release has not been called.");
      }
      return this.releasedAt + this.settings.releaseTime;
    }
  }]);

  return Envelope;
}();

module.exports = Envelope;

