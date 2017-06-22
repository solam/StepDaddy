/*function controller( number, value ) {
  switch(number) {
  case 2:
    $("fFreq").setRatioValue(value);
    onUpdateFilterCutoff( 100*value );
    return;
  case 0x0a:
  case 7:
    $("fQ").setValue(20*value);
    onUpdateFilterQ( 20*value );
    return;
  case 1:
    $("fMod").setValue(100*value);
    onUpdateFilterMod(100*value); 
    return;
  case 0x49:
  case 5:
  case 15:
      $("drive").setValue(100 * value);
      onUpdateDrive( 100 * value );
      return;
  case 0x48:
  case 6:
  case 16:
      $("reverb").setValue(100 * value);
      onUpdateReverb( 100 * value );
      return;
  case 0x4a:
      $("modOsc1").setValue(100 * value);
      onUpdateModOsc1( 100 * value );
      return;
  case 0x47:
      $("modOsc2").setValue(100 * value);
      onUpdateModOsc2( 100 * value );
      return;
  case 4:
  case 17:
      $("mFreq").setValue(10 * value);
      onUpdateModFrequency( 10 * value );
      return;
  case 0x5b:
      $("volume").setValue(100 * value);
      onUpdateVolume( 100 * value );
      return;
  case 33: // "x1" button
  case 51:
    moDouble = (value > 0);
    changeModMultiplier();
      return;
  case 34: // "x2" button
  case 52:
    moQuadruple = (value > 0);
    changeModMultiplier();
      return;
  }
}
*/

function midiMessageReceived( ev ) {
  var cmd = ev.data[0] >> 4;
  var channel = ev.data[0] & 0xf;
  var noteNumber = ev.data[1];
  var velocity = ev.data[2];

  if (channel == 9)
    return
  if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // with MIDI, note on with velocity zero is the same as note off
    // note off
    //noteOff( noteNumber );
  } else if (cmd == 9) {
    // note on
    console.log( "" + ev.data[0] + " " + ev.data[1] + " " + ev.data[2]);
    window['muteNote'+noteNumber](noteNumber, velocity/127.0);
    //noteOn( noteNumber, velocity/127.0);
  } else if (cmd == 11) {
    
    //window.midicc( noteNumber, velocity/127.0);
    window['midicc'+noteNumber](noteNumber, velocity/127.0);
    //controller( noteNumber, velocity/127.0);
  } else if (cmd == 14) {
    // pitch wheel
    pitchWheel( ((velocity * 128.0 + noteNumber)-8192)/8192.0 );
  } else if ( cmd == 10 ) {  // poly aftertouch
    polyPressure(noteNumber,velocity/127)
  } else if ( ev.data[0] == 254 ) {
    return  // do not show midi controller studiotech mc-25 emitting unwanted midi data 
  } /*else 
  console.log( "" + ev.data[0] + " " + ev.data[1] + " " + ev.data[2])*/
}

var selectMIDI = null;
var midiAccess = null;
var midiIn = null;

function selectMIDIIn( ev ) {
  if (midiIn)
    midiIn.onmidimessage = null;
  var id = ev.target[ev.target.selectedIndex].value;
  if ((typeof(midiAccess.inputs) == "function"))   //Old Skool MIDI inputs() code
    midiIn = midiAccess.inputs()[ev.target.selectedIndex];
  else
    midiIn = midiAccess.inputs.get(id);
  if (midiIn)
    midiIn.onmidimessage = midiMessageReceived;
}

function populateMIDIInSelect() {
  // clear the MIDI input select
  selectMIDI.options.length = 0;
  if (midiIn && midiIn.state=="disconnected")
    midiIn=null;
  var firstInput = null;

  var inputs=midiAccess.inputs.values();
  for ( var input = inputs.next(); input && !input.done; input = inputs.next()){
    input = input.value;
    if (!firstInput)
      firstInput=input;
    var str=input.name.toString();
    var preferred = !midiIn && ((str.indexOf("MPK") != -1)||(str.indexOf("Keyboard") != -1)||(str.indexOf("keyboard") != -1)||(str.indexOf("KEYBOARD") != -1));

    // if we're rebuilding the list, but we already had this port open, reselect it.
    if (midiIn && midiIn==input)
      preferred = true;

    selectMIDI.appendChild(new Option(input.name,input.id,preferred,preferred));
    if (preferred) {
      midiIn = input;
      midiIn.onmidimessage = midiMessageReceived;
    }
  }
  if (!midiIn) {
      midiIn = firstInput;
      if (midiIn)
        midiIn.onmidimessage = midiMessageReceived;
  }
}

function midiConnectionStateChange( e ) {
  console.log("connection: " + e.port.name + " " + e.port.connection + " " + e.port.state );
  populateMIDIInSelect();
}

function onMIDIStarted( midi ) {
  var preferredIndex = 0;

  midiAccess = midi;

  //document.getElementById("synthbox").className = "loaded";
  selectMIDI=document.getElementById("midiIn");
  midi.onstatechange = midiConnectionStateChange;
  populateMIDIInSelect();
  selectMIDI.onchange = selectMIDIIn;



      /*
      window.setTimeout(function () {
        // wait 2 secs than auto select 2nd item, by default
        //$("#midiIn").val($("#midiIn option:eq(1)").val()); : only selects does not really simulate click

        var miInVal = $("#midiIn option:eq(1)").val();

        console.log('miInVal: ', miInVal);

        ​$('option[value='+miInVal+']').attr('selected', 'selected').parent().focus();​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​

        //$('option['+miInVal+']').attr('selected', 'selected').parent().focus();​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​

        //$("#midiIn option:eq(1)").val().attr('selected', 'selected').parent().focus();​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​

      }, 2000);
      //*/



}

function onMIDISystemError( err ) {
  //document.getElementById("synthbox").className = "error";
  console.log( "MIDI not initialized - error encountered:" + err.code );
}

//init: start up MIDI
window.addEventListener('load', function() {   
  if (navigator.requestMIDIAccess)
    navigator.requestMIDIAccess().then( onMIDIStarted, onMIDISystemError );

    //if ($('#midiIn option').val('Komplete Audio 6 MIDI 1')) {
    //$('#midiIn option:eq(1)').prop('selected',true).trigger('change'); //  // .val('Komplete Audio 6 MIDI 1')
  //} */

});