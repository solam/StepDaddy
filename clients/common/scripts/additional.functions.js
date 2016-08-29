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




//<script type="text/javascript">

function rotate( array , times ){
  while( times-- ){
    var temp = array.shift();
    array.push( temp )
  }
}
//</script>


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