ip = '192.168.1.16';

// It is useful not to use as 'ip' variable values like '127.0.0.1' or 'localhost' so that other devices on same local network may connect to device hosting ...Loops NodeJS & Web servers
window.ip = ip;

window.SERVER = 'http://'+ip+':60000'; //  
window.CLIENTS = 'http://'+ip+':8282/sequencer'; // 
window.comode= 'http';
// */

/* // online version
ip = 'loops.solam.co'; 

window.ip = ip;

window.hosteu = 'loops.solam.co'
window.SERVER = 'https://'+ip+':60001'; // 
window.CLIENTS = 'https://'+window.hosteu+'/clients/sequencer';
window.comode= 'https';
// */


/**
 * The mixr namespace
 * @type {Object}
 */
var mixr = mixr || {};

/**
 * The audio namespace
 * @type {Object}
 */
mixr.audio = mixr.audio || {};

/**
 * The views namespace
 * @type {Object}
 */
mixr.views = mixr.views || {};

/**
 * The controllers namespace
 * @type {Object}
 */
mixr.controllers = mixr.controllers || {};

/**
 * The commands namespace
 * @type {Object}
 */
mixr.commands = mixr.commands || {};

/**
 * The models namespace
 * @type {Object}
 */
mixr.models = mixr.models || {};

/**
 * The net namespace
 * @type {Object}
 */
mixr.net = mixr.net || {};

/**
 * The mixins namespace
 * @type {Object}
 */
mixr.mixins = mixr.mixins || {};

/**
 * The enum namespace
 * @type {Object}
 */
mixr.enums = mixr.enums || {};

/**
 * The ui namespace
 * @type {Object}
 */
mixr.ui = mixr.ui || {};

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
