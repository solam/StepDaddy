var pointerDebugging = false;

var currentOctave = 3; // make it dynamic

var keys = new Array( 256 );
//Lower row: zsxdcvgbhnjm...
keys[16] = 41; // = F2
keys[65] = 42;
keys[90] = 43;
keys[83] = 44;
keys[88] = 45;
keys[68] = 46;
keys[67] = 47;
keys[86] = 48; // = C3
keys[71] = 49;
keys[66] = 50;
keys[72] = 51;
keys[78] = 52;
keys[77] = 53; // = F3
keys[75] = 54;
keys[188] = 55;
keys[76] = 56;
keys[190] = 57;
keys[186] = 58;
keys[191] = 59;

// Upper row: q2w3er5t6y7u...
keys[81] = 60; // = C4 ("middle C")
keys[50] = 61;
keys[87] = 62;
keys[51] = 63;
keys[69] = 64;
keys[82] = 65; // = F4
keys[53] = 66;
keys[84] = 67;
keys[54] = 68;
keys[89] = 69;
keys[55] = 70;
keys[85] = 71;
keys[73] = 72; // = C5
keys[57] = 73;
keys[79] = 74;
keys[48] = 75;
keys[80] = 76;
keys[219] = 77; // = F5
keys[187] = 78;
keys[221] = 79;
keys[220] = 80;

function keyDown( ev ) {
  if ((ev.keyCode==49)||(ev.keyCode==50)) {
    if (ev.keyCode==49)
      moDouble = true;
    else if (ev.keyCode==50)
      moQuadruple = true;
    changeModMultiplier();
  }

  var note = keys[ev.keyCode];
  if (note)
    noteOn( note + 12*(3-currentOctave), 0.75 );
  console.log( "key down: " + ev.keyCode );

  return false;
}

function keyUp( ev ) {
  if ((ev.keyCode==49)||(ev.keyCode==50)) {
    if (ev.keyCode==49)
      moDouble = false;
    else if (ev.keyCode==50)
      moQuadruple = false;
    changeModMultiplier();
  }

  var note = keys[ev.keyCode];
  if (note)
    noteOff( note + 12*(3-currentOctave) );
//  console.log( "key up: " + ev.keyCode );

  return false;
}
var pointers=[];

function touchstart( ev ) {
  for (var i=0; i<ev.targetTouches.length; i++) {
      var touch = ev.targetTouches[0];
    var element = touch.target;

    var note = parseInt( element.id.substring( 1 ) );
    console.log( "touchstart: id: " + element.id + "identifier: " + touch.identifier + " note:" + note );
    if (!isNaN(note)) {
      noteOn( note + 12*(3-currentOctave), 0.75 );
      var keybox = document.getElementById("keybox")
      pointers[touch.identifier]=note;
    }
  }
  ev.preventDefault();
}

function touchmove( ev ) {
  for (var i=0; i<ev.targetTouches.length; i++) {
      var touch = ev.targetTouches[0];
    var element = touch.target;

    var note = parseInt( element.id.substring( 1 ) );
    console.log( "touchmove: id: " + element.id + "identifier: " + touch.identifier + " note:" + note );
    if (!isNaN(note) && pointers[touch.identifier] && pointers[touch.identifier]!=note) {
      noteOff(pointers[touch.identifier] + 12*(3-currentOctave));
      noteOn( note + 12*(3-currentOctave), 0.75 );
      var keybox = document.getElementById("keybox")
      pointers[touch.identifier]=note;
    }
  }
  ev.preventDefault();
}

function touchend( ev ) {
  var note = parseInt( ev.target.id.substring( 1 ) );
  console.log( "touchend: id: " + ev.target.id + " note:" + note );
  if (note != NaN)
    noteOff( note + 12*(3-currentOctave) );
  pointers[ev.pointerId]=null;
  var keybox = document.getElementById("keybox")
  ev.preventDefault();
}

function touchcancel( ev ) {
  console.log( "touchcancel" );
  ev.preventDefault();
}

function pointerDown( ev ) {
  var note = parseInt( ev.target.id.substring( 1 ) );
  if (pointerDebugging)
    console.log( "pointer down: id: " + ev.pointerId
      + " target: " + ev.target.id + " note:" + note );
  if (!isNaN(note)) {
    noteOn( note + 12*(3-currentOctave), 0.75 );
    var keybox = document.getElementById("keybox")
    pointers[ev.pointerId]=note;
  }
  ev.preventDefault();
}

function pointerMove( ev ) {
  var note = parseInt( ev.target.id.substring( 1 ) );
  if (pointerDebugging)
    console.log( "pointer move: id: " + ev.pointerId 
      + " target: " + ev.target.id + " note:" + note );
  if (!isNaN(note) && pointers[ev.pointerId] && pointers[ev.pointerId]!=note) {
    if (pointers[ev.pointerId])
      noteOff(pointers[ev.pointerId] + 12*(3-currentOctave));
    noteOn( note + 12*(3-currentOctave), 0.75 );
    pointers[ev.pointerId]=note;
  }
  ev.preventDefault();
}

function pointerUp( ev ) {
  var note = parseInt( ev.target.id.substring( 1 ) );
  if (pointerDebugging)
    console.log( "pointer up: id: " + ev.pointerId + " note:" + note );
  if (note != NaN)
    noteOff( note + 12*(3-currentOctave) );
  pointers[ev.pointerId]=null;
  var keybox = document.getElementById("keybox")
  ev.preventDefault();
}


function noteOn( note, velocity ) {
  console.log("note on: " + note );

if (typeof window.ptnEditorModel  !== 'undefined') {
//console.log(window.ptnEditorModel)
window.ptnEditorModel.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 989, note: note, velocity: velocity, type: 'on', cid: window.channelId });
}

  //if (voices[note] == null) {
    // Create a new synth node
    //voices[note] = new Voice(note, velocity);
    var e = document.getElementById( "k" + note );
    if (e)
      e.classList.add("pressed");
  //}
}

function noteOff( note, velocity ) {

if (typeof window.ptnEditorModel  !== 'undefined') {
//console.log(window.ptnEditorModel)
window.ptnEditorModel.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 989, note: note, velocity: 0, type: 'off', cid: window.channelId });
}  
  //if (voices[note] != null) {
    // Shut off the note playing and clear it 
    //voices[note].noteOff();
    //voices[note] = null;
    var e = document.getElementById( "k" + note );
    if (e)
      e.classList.remove("pressed");
  }  
