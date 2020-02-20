var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};


function testGCOModes() {
  // In this object are stored the pixels as they should appear at the 3 positions we'll look : 
  // 0 is an empty pixel
  // 1 is the first pixel drawn
  // 2 is the second pixel drawn
  // 3 is none of the above (blending)
  // We'll look to the central pixel first since it is the most likely to change
  var gCO = {
    "source-over": [2, 1, 2],
    "source-in": [2, 0, 0],
    "source-out": [0, 0, 2],
    "source-atop": [2, 1, 0],
    "destination-over": [1, 1, 2],
    "destination-in": [1, 0, 0],
    "destination-out": [0, 1, 0],
    "destination-atop": [1, 0, 2],
    "lighter": [3, 1, 2],
    "copy": [2, 0, 2],
    "xor": [0, 1, 2],
    "multiply": [3, 1, 2],
    "screen": [3, 1, 2],
    "overlay": [3, 1, 2],
    "darken": [1, 1, 2],
    "color-dodge": [3, 1, 2],
    "color-burn": [3, 1, 2],
    "hard-light": [3, 1, 2],
    "soft-light": [3, 1, 2],
    "difference": [3, 1, 2],
    "exclusion": [3, 1, 2],
    "hue": [3, 1, 2],
    "saturation": [3, 1, 2],
    "color": [3, 1, 2],
    "luminosity": [3, 1, 2]
  };
  // create two 3*3 canvases that will be used as layers
  var c1 = document.createElement('canvas');
  c1.width = c1.height = 3;
  var c2 = c1.cloneNode(true),
    // the third one will be the tester
    c3 = c1.cloneNode(true),

    ctx1 = c1.getContext('2d'),
    ctx2 = c2.getContext('2d'),
    ctx3 = c3.getContext('2d');
  // fill our canvases with solid colors
  ctx1.fillStyle = 'green';
  ctx1.fillRect(0, 0, 3, 3);
  ctx2.fillStyle = 'pink';
  ctx2.fillRect(0, 0, 3, 3);
  // get the image data of one pixel that will corresponds to the values in gCO's arrays
  var em = [0, 0, 0, 0], // 0 or empty
    d1 = ctx1.getImageData(0, 0, 1, 1).data, // 1 
    d2 = ctx2.getImageData(0, 0, 1, 1).data; // 2
  // the positions of the pixels in our imageData 
  // again, start with the central one
  var pos = [16, 0, 32];

  // make an array of all our gCOs
  var keys = Object.keys(gCO);
  return keys.filter(function(g) {
    var i;
    // get the array corresponding to the actual key
    var arr = gCO[g];

    var layer = [];
    // get the correct imageData for each layer we should find
    for (i = 0; i < 3; i++) {
      switch (arr[i]) {
        case 0:
          layer[i] = em;
          break;
        case 1:
          layer[i] = d1;
          break;
        case 2:
          layer[i] = d2;
          break;
        case 3:
          layer[i] = null;
          break;
      }
    }
    // first reset the canvas
    ctx3.globalCompositeOperation = 'source-over';
    ctx3.clearRect(0, 0, 3, 3);
    // draw the first layer in the top-left corner
    ctx3.drawImage(c1, -1, -1);
    // set the current gCO
    ctx3.globalCompositeOperation = g;
    // draw the second layer in the top-right corner so it comes over it
    ctx3.drawImage(c2, 1, 1);
    // get the image data of our test canvas
    var d3 = ctx3.getImageData(0, 0, 3, 3).data;
    // we will first admit that it is supported;
    var tempResult = true;
    // iterate through the 3 positions (center, top-left, bottom-right)
    for (i = 0; i < pos.length; i++) {
      // we know what it should return
      if (layer[i] !== null) {
        // is it the same pixel as expected ?
        tempResult = d3[pos[i]] === layer[i][0] &&
          d3[pos[i] + 1] === layer[i][1] &&
          d3[pos[i] + 2] === layer[i][2] &&
          d3[pos[i] + 3] === layer[i][3];
      }
      // some blending operation
      else {
        // is it different than the last drawn layer ? 
        //(if the mode is not supported, the default gCO "source-over" will be used)
        tempResult = d3[pos[i]] !== d2[0] || d3[pos[i] + 1] !== d2[1] || d3[pos[i] + 2] !== d2[2] || d3[pos[i] + 3] !== d2[3];
      }
      // our flag switched to false
      if (!tempResult)
      // no need to go to the other pixels, it's not supported
        return false;
    }
    // this mode is supported
    return true;
  });
}

// check for HTML5 canvas blend mode property 'multiply' browser support        
var supportedGCO = testGCOModes();
gcoCheck = contains.call(supportedGCO, 'multiply'); // true - false



function rotate( array , times ){
  while( times-- ){
    var temp = array.shift();
    array.push( temp )
  }
}



/**
 * Sort JavaScript Object
 * CF Webtools : Chris Tierney
 * obj = object to sort
 * order = 'asc' or 'desc'
 */
function sortObj( obj, order ) {
  "use strict";

  var key,
    tempArry = [],
    i,
    tempObj = {};

  for ( key in obj ) {
    tempArry.push(key);
  }

  tempArry.sort(
    function(a, b) {
      return a.toLowerCase().localeCompare( b.toLowerCase() );
    }
  );

  if( order === 'desc' ) {
    for ( i = tempArry.length - 1; i >= 0; i-- ) {
      tempObj[ tempArry[i] ] = obj[ tempArry[i] ];
    }
  } else {
    for ( i = 0; i < tempArry.length; i++ ) {
      tempObj[ tempArry[i] ] = obj[ tempArry[i] ];
    }
  }

  return tempObj;
}


function isEvenStrict(n) {
  return n === parseFloat(n)? !(n%2) : void 0;
}


function collect() {
  var ret = {};
  var len = arguments.length;
  for (var i=0; i<len; i++) {
    for (p in arguments[i]) {
      if (arguments[i].hasOwnProperty(p)) {
        ret[p] = arguments[i][p];
      }
    }
  }
  return ret;
}


function forIn(obj, fn, thisObj) {
  var key, i = 0;
  for (key in obj) {
    if (exec(fn, obj, key, thisObj) === false) {
      break;
    }
  }
  function exec(fn, obj, key, thisObj) {
    return fn.call(thisObj, obj[key], key, obj);
  }
  return forIn;
}


function touchClick(btn, param, fnc) {
    $(btn).on(param, function(event) {
        event.stopPropagation()
        event.preventDefault()
        if(event.handled !== true) {
            fnc(event)
            event.handled = true
        } else {
            return false
        }
    })
}



window.mobilecheck = function() {
//function checkIfMobile() {  
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};






window.updateNote = function(data) {
  $track = $('[data-id="' + data.trackId + '"]');
  $note = $track.find('td').eq(data.noteId + 1);
  $note.toggleClass('active', data.volume > 0);
};  



window.displayPattern = function(selectId) {

  if ( !$('body').hasClass('control') && $('#patternedit').length>0 ) { // !==null

      var classs = $('#'+selectId).find(":selected").attr('class');
      var elementId = $('#'+selectId).find(":selected").val();

      //console.log('elementId: ', elementId, selectId);

      // option00001

      if (selectId=='selpatternedit') {
        var ptnHolder = 'userPatternEdit';
      } else if (selectId=='patterns') { // don't wipe userPattern memory when switching from 'ptn play display' to 'ptn edit display'
        var ptnHolder = 'userPatternEdit';
      }  

      var ptnStorage = window.sessionPatterns.concat(window.channelPatterns);
      //var ptnStorage = window.localPatterns.concat(window.sessionPatterns.concat(window.channelPatterns)); //window.channelPatterns.concat(window.sessionPatterns).concat(window.localPatterns);
      
      if (typeof ptnStorage !== 'undefined') {
        if (typeof ptnStorage !== 'undefined' && ptnStorage.length>0) { // 1
          //console.log('ptnStorage', ptnStorage);
          var ptnStorage = ptnStorage.filter((set => p => !set.has(p.id) && set.add(p.id))(new Set)); 
        }
      }

      if (typeof ptnStorage !== 'undefined' && ptnStorage.length>0) { // 1

        var result = $.grep(ptnStorage, function(e){ return e.id == elementId; });
        if (typeof result[0] !== 'undefined') {
          var trackNumber = result[0].tracks.length; 
        } else {
          var trackNumber = 0;
        }

        if ($('#'+selectId+' option[value="0"]').length>0 ) { 
          result[0] = {};
          result[0].tracks = window['userPattern'].tracks;
        }      
      }
        
      if (typeof result[0]   == 'undefined') { return }   // result[0]  - result[0]  

      var channelId = $('#pattern-editor tr').first().attr('data-id').split('-')[0]; 

      notesObject = [];

      window[ptnHolder] = {'tracks' : [] };

      // first reset grid
      var availTrackNumber = $("#pattern-editor table tr").length;

      for (var n = 0, len = availTrackNumber; n < len; n += 1) {
        var notesNumber = 16;
        window[ptnHolder].tracks[n] = [];

        for (var l = 0; l < notesNumber; l += 1) {
          noteInfo = {};
          noteInfo.id = channelId;
          noteInfo.trackId = channelId+'-'+n;
          noteInfo.noteId = l;
          noteInfo.volume = 0;
          window[ptnHolder].tracks[n][l]=0;
          window.updateNote(noteInfo);
          //console.log('noteInfo: ',noteInfo);
        }  
      } 

      // than fill grid with corresponding data
      for (var n = 0, len = availTrackNumber; n < len; n += 1) { 

        if (typeof result[0].tracks[n] !== 'undefined') {
          
          var notesNumber = result[0].tracks[n].length;
          var traack = result[0].tracks[n];

          for (var l = 0; l < notesNumber; l += 1) {
            noteInfo = {};
            noteInfo.id = channelId;
            noteInfo.trackId = channelId+'-'+n;
            noteInfo.noteId = l;
            noteInfo.volume = traack[l];

            window[ptnHolder].tracks[n][l]=traack[l];

            window.updateNote(noteInfo);
            //console.log('noteInfo: ',noteInfo);

          }  
        }
      } 


     var classs = 'user';//$('#selpatternedit').find(":selected").attr('class');
     var patternId = $('#selpatternedit').find(":selected").val();

     window['userPatternEdit'].name = $('#selpatternedit').find(":selected").text();
     window['userPatternEdit'].id = patternId;
     window['userPatternEdit'].classs = classs;


     var attr = $('#'+selectId).find(":selected").attr('data-notemin');

     // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
     if (typeof attr !== typeof undefined && attr !== false) {
      window['notesPerLine'] = {};
      window['notesPerLine'].min = $('#'+selectId).find(":selected").attr('data-notemin');
      window['notesPerLine'].max = $('#'+selectId).find(":selected").attr('data-notemax');    
     }
    } // end of conductor role exclusion
  };  // end of fct


window.findObjectById = function(o, id) {
    //Early return
    if( o.id === id ){
      return o;
    }
    var result, p; 
    for (p in o) {
        if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
            result = window.findObjectById(o[p], id);
            if(result){
                return result;
            }
        }
    }
    return result;
}    


window['autoinc']= [];





function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


// var RateLimit

//window.ratelimit = (function() {
var RateLimit = (function() {  
  var RateLimit = function(maxOps, interval, allowBursts) {
    this._maxRate = allowBursts ? maxOps : maxOps / interval;
    this._interval = interval;
    this._allowBursts = allowBursts;

    this._numOps = 0;
    this._start = new Date().getTime();
    this._queue = [];
  };

  RateLimit.prototype.schedule = function(fn) {
    var that = this,
        rate = 0,
        now = new Date().getTime(),
        elapsed = now - this._start;

    if (elapsed > this._interval) {
      this._numOps = 0;
      this._start = now;
    }

    rate = this._numOps / (this._allowBursts ? 1 : elapsed);

    if (rate < this._maxRate) {
      if (this._queue.length === 0) {
        this._numOps++;
        fn();
      }
      else {
        if (fn) this._queue.push(fn);

        this._numOps++;
        this._queue.shift()();
      }
    }
    else {
      if (fn) this._queue.push(fn);

      setTimeout(function() {
        that.schedule();
      }, 1 / this._maxRate);
    }
  };

  return RateLimit;
})();



//var rateLimit = new window.ratelimit(1, 10000, true); // 10 calls in 100 milliseconds allowed = 100 calls/sec - 1:10
window.ratelimit = new RateLimit(1, 1, false); // 20 calls / sec : 1:50 - [1 : 70] - 1, 25
//window.ratelimit = new RateLimit(99999999999999999, 1, true);

// less tolerance for add preset at each slider change !
window.ratelimitPresetChange = new RateLimit(1, 100, false); // [1 : 400] - 1, 100



window.sleep = function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


function removeDuplicates(array, key) {
    let lookup = {};
    let result = [];
    array.forEach(element => {
        if(!lookup[element[key]]) {
            lookup[element[key]] = true;
            result.push(element);
        }
    });
    return result;
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
