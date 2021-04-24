var CWilsoWAMidiSynth = function(context) {



// slidFreq
this.sf = new Array( 101 );


/*

this.sf[0] = 20;
this.sf[1] = 40;
this.sf[2] = 80;
this.sf[3] = 120;
this.sf[4] = 160;
this.sf[5] = 200;
this.sf[6] = 260;
this.sf[7] = 350;
this.sf[8] = 460;
this.sf[9] = 550;

this.sf[10] = 700;
this.sf[11] = 800;
this.sf[12] = 900;
this.sf[13] = 1100;
this.sf[14] = 1300;
this.sf[15] = 1600;
this.sf[16] = 1800;
this.sf[17] = 2200;
this.sf[18] = 2500;
this.sf[19] = 2800;

this.sf[20] = 3400;
this.sf[21] = 3800;
this.sf[22] = 4300;
this.sf[23] = 4700;
this.sf[24] = 4900;
this.sf[25] = 5100;
this.sf[26] = 5300;
this.sf[27] = 5600;
this.sf[28] = 5800;
this.sf[29] = 6000;

this.sf[30] = 6300;
this.sf[31] = 6700;
this.sf[32] = 7000;
this.sf[33] = 7400;
this.sf[34] = 7800;
this.sf[35] = 8000;
this.sf[36] = 8200;
this.sf[37] = 8500;
this.sf[38] = 8800;
this.sf[39] = 9000;

this.sf[40] = 9100;
this.sf[41] = 9200;
this.sf[42] = 9300;
this.sf[43] = 9400;
this.sf[44] = 9500;
this.sf[45] = 9600;
this.sf[46] = 9700;
this.sf[47] = 9800;
this.sf[48] = 9900;
this.sf[49] = 10000;

this.sf[50] = 10100;
this.sf[51] = 10200;
this.sf[52] = 10300;
this.sf[53] = 10400;
this.sf[54] = 10500;
this.sf[55] = 10600;
this.sf[56] = 10700;
this.sf[57] = 10800;
this.sf[58] = 10900;
this.sf[59] = 11000;

this.sf[60] = 11200;
this.sf[61] = 11400;
this.sf[62] = 11600;
this.sf[63] = 11800;
this.sf[64] = 12000;
this.sf[65] = 12200;
this.sf[66] = 12400;
this.sf[67] = 12600;
this.sf[68] = 12800;
this.sf[69] = 13000;

this.sf[70] = 13000;
this.sf[71] = 13600;
this.sf[72] = 13900;
this.sf[73] = 14200;
this.sf[74] = 14500;
this.sf[75] = 14800;
this.sf[76] = 15000;
this.sf[77] = 15200;
this.sf[78] = 15400;
this.sf[79] = 15600;

this.sf[80] = 15800;
this.sf[81] = 16000;
this.sf[82] = 16300;
this.sf[83] = 16600;
this.sf[84] = 16900;
this.sf[85] = 17200;
this.sf[86] = 17500;
this.sf[87] = 17800;
this.sf[88] = 18100;
this.sf[89] = 18400;

this.sf[90] = 18700;
this.sf[91] = 18800;
this.sf[92] = 18900;
this.sf[93] = 19000;
this.sf[94] = 19100;
this.sf[95] = 19300;
this.sf[96] = 19400;
this.sf[97] = 19600;
this.sf[98] = 19800;
this.sf[99] = 19900;

this.sf[100] = 20000;

*/


// set that 
/*
0 > 50 : 5000 hz

51 > 89 : 12 khz

90 > 98 : 14 khz
99 & 100: 16 18

finishes 12000 till 89

*/



this.sf[0] = 20;
this.sf[1] = 25;
this.sf[2] = 30;
this.sf[3] = 40;
this.sf[4] = 60;
this.sf[5] = 80;
this.sf[6] = 100;
this.sf[7] = 140;
this.sf[8] = 180;
this.sf[9] = 240;

this.sf[10] = 320;
this.sf[11] = 380;
this.sf[12] = 440;
this.sf[13] = 500;
this.sf[14] = 580;
this.sf[15] = 660;
this.sf[16] = 760;
this.sf[17] = 880;
this.sf[18] = 1000;
this.sf[19] = 1100;

this.sf[20] = 1200;
this.sf[21] = 1300;
this.sf[22] = 1400;
this.sf[23] = 1500;
this.sf[24] = 1600;
this.sf[25] = 1700;
this.sf[26] = 1800;
this.sf[27] = 1850;
this.sf[28] = 1900;
this.sf[29] = 1950;

this.sf[30] = 2000;
this.sf[31] = 2050;
this.sf[32] = 2125;
this.sf[33] = 2150;
this.sf[34] = 2175;
this.sf[35] = 2200;
this.sf[36] = 2300;
this.sf[37] = 2400;
this.sf[38] = 2500;
this.sf[39] = 2600;

this.sf[40] = 2700;
this.sf[41] = 2800;
this.sf[42] = 2900;
this.sf[43] = 3000;
this.sf[44] = 3200;
this.sf[45] = 3400;
this.sf[46] = 3600;
this.sf[47] = 3800;
this.sf[48] = 4200;
this.sf[49] = 4600;

this.sf[50] = 5000;

this.sf[51] = 5100;
this.sf[52] = 5200;
this.sf[53] = 5300;
this.sf[54] = 5400;
this.sf[55] = 5500;
this.sf[56] = 5600;
this.sf[57] = 5700;
this.sf[58] = 5800;
this.sf[59] = 5900;

this.sf[60] = 6100;
this.sf[61] = 6300;
this.sf[62] = 6500;
this.sf[63] = 6700;
this.sf[64] = 6900;
this.sf[65] = 7100;
this.sf[66] = 7300;
this.sf[67] = 7500;
this.sf[68] = 7800;
this.sf[69] = 8100;

this.sf[70] = 8400;
this.sf[71] = 8800;
this.sf[72] = 9100;
this.sf[73] = 9400;
this.sf[74] = 9700;
this.sf[75] = 10000;
this.sf[76] = 10300;
this.sf[77] = 10600;
this.sf[78] = 10900;
this.sf[79] = 11200;

this.sf[80] = 11300;
this.sf[81] = 11400;
this.sf[82] = 11500;
this.sf[83] = 11600;
this.sf[84] = 11700;
this.sf[85] = 11800;
this.sf[86] = 11900;
this.sf[87] = 12000;
this.sf[88] = 12300;
this.sf[89] = 12500;

this.sf[90] = 12800;
this.sf[91] = 13000;
this.sf[92] = 13200;
this.sf[93] = 13400;
this.sf[94] = 13700;
this.sf[95] = 14000;
this.sf[96] = 15000;
this.sf[97] = 16000;
this.sf[98] = 17000;
this.sf[99] = 18000;

this.sf[100] = 20000;





  // This is the "initial patch"

  // modulation lfo
  this.currentModWaveform = 0; // SINE
  this.currentModFrequency = 2.1; // Hz * 10 = 2.1
  this.currentModOsc1 = 15;
  this.currentModOsc2 = 17;

  this.currentOsc1Waveform = 2; // SAW
  this.currentOsc1Octave = 0;  // 32'
  this.currentOsc1Detune = 0;  // 0
  this.currentOsc1Mix = 50.0;  // 50%

  this.currentOsc2Waveform = 2; // SAW
  this.currentOsc2Octave = 0;  // 16'
  this.currentOsc2Detune = -25;  // fat detune makes pretty analogue-y sound.  :)
  this.currentOsc2Mix = 50.0;  // 0%

  this.currentFilterCutoff = 8;
  this.currentFilterQ = 7.0;
  this.currentFilterMod = 21;
  this.currentFilterEnv = 56;

  this.currentEnvA = 2;
  this.currentEnvD = 15;
  this.currentEnvS = 68;
  this.currentEnvR = 5;

  this.currentFilterEnvA = 5;
  this.currentFilterEnvD = 6;
  this.currentFilterEnvS = 5;
  this.currentFilterEnvR = 7;

  this.currentDrive = 38;
  this.currentRev = 32;
  this.currentVol = 75;
  // end initial patch

  this.currentOctave = 3; // 3
  this.modOscFreqMultiplier = 1;
  this.moDouble = false;
  this.moQuadruple = false;

  //function initAudio(audioContext) {
  /*window.AudioContext = window.AudioContext || window.webkitAudioContext;
  try {
      audioContext = window['audio_context']; //new AudioContext();
    }
    catch(e) {
      alert('The Web Audio API is apparently not supported in this browser.');
    } */

  //window.audioContext = audioContext;
  this.context = context;

  this.voices = new Array();

  /*window.addEventListener('keydown', keyDown, false);
  window.addEventListener('keyup', keyUp, false);
  setupSynthUI();*/

  isMobile = (navigator.userAgent.indexOf("Android")!=-1)||(navigator.userAgent.indexOf("iPad")!=-1)||(navigator.userAgent.indexOf("iPhone")!=-1);

  // set up the master effects chain for all voices to connect to.
  this.effectChain = this.context.createGain();
  this.waveshaper = new WaveShaper( this.context );

  this.effectChain.connect( this.waveshaper.input );
  this.onUpdateDrive( this.currentDrive );

  if (!isMobile)
    this.revNode = this.context.createConvolver();
  else
    this.revNode = this.context.createGain();
  this.revGain = this.context.createGain();
  this.revBypassGain = this.context.createGain();

  this.volNode = this.context.createGain();
  this.volNode.gain.value = this.currentVol;
  this.compressor = this.context.createDynamicsCompressor();
  this.waveshaper.output.connect( this.revNode );
  this.waveshaper.output.connect( this.revBypassGain );
  this.revNode.connect( this.revGain );
  this.revGain.connect( this.volNode );
  this.revBypassGain.connect( this.volNode );
  this.onUpdateReverb( {currentTarget:{value:this.currentRev}} );

  this.volNode.connect( this.compressor );

  // console.log('pass');

  this.compressor.connect(  window['audio_context'], 0, 0 ); // this.context.destination

  this.onUpdateVolume( {currentTarget:{value:this.currentVol}} );

  // reverb to be fixed when not on a mobile device
  /*  if (!isMobile) {
    irRRequest = new XMLHttpRequest();
    irRRequest.open("GET", "instruments/midi-synth-master/sounds/irRoom.wav", true);
    irRRequest.responseType = "arraybuffer";
    irRRequest.onload = function() {
        context.decodeAudioData(irRRequest.response, 
          function(buffer) { if (this.revNode) this.revNode.buffer = buffer; else console.log("no revNode ready!")} );
    }
    irRRequest.send();
  } */

}





function frequencyFromNoteNumber( note ) {
  var frekk = 440 * Math.pow(2,(note-28)/12);
  //console.log(frekk);
  return frekk;
}




CWilsoWAMidiSynth.prototype.noteOn = function(note, velocity, channelId) {
//function noteOn( note, velocity ) {
	//console.log("note on: " + note );
	if (this.voices[note] == null) {
		// Create a new synth node
		this.voices[note] = new Voice(note, velocity, channelId);
		/*var e = document.getElementById( "k" + note );
		if (e)
			e.classList.add("pressed");*/
	} 
}
CWilsoWAMidiSynth.prototype.noteOff = function(note, channelId) {
//function noteOff( note ) {
	if (this.voices[note] != null) {
		// Shut off the note playing and clear it 
		this.voices[note].noteOff(channelId);
		this.voices[note] = null;
		/*var e = document.getElementById( "k" + note );
		if (e)
			e.classList.remove("pressed");*/

//
	}

}



function $a(id) {
	return document.getElementById(id);
}



// midi control value normalization
// 'value' is normalized to 0..1.
function controller( number, value ) {
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





var currentPitchWheel = 0.0;
// 'value' is normalized to [-1,1]
function pitchWheel( value ) {
	var i;

	currentPitchWheel = value;
	for (var i=0; i<255; i++) {
		if (voices[i]) {
			if (voices[i].osc1)
				voices[i].osc1.detune.value = currentOsc1Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
			if (voices[i].osc2)
				voices[i].osc2.detune.value = currentOsc2Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
		}
	}
}

function polyPressure( noteNumber, value ) {
	if (voices[noteNumber] != null) {
		voices[noteNumber].setFilterQ( value*20 );
	}
}

var waveforms = ["sine","square","sawtooth","triangle"];



CWilsoWAMidiSynth.prototype.onUpdateModWaveform = function(ev) {
	this.currentModWaveform = ev.target.selectedIndex;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].setModWaveform( waveforms[this.currentModWaveform] );
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateModFrequency = function(ev) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	this.currentModFrequency = value;
	var oscFreq = this.currentModFrequency * this.modOscFreqMultiplier;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateModFrequency( oscFreq );
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateModOsc1 = function(ev) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	this.currentModOsc1 = value;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateModOsc1( currentModOsc1 );
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateModOsc2 = function(ev) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	currentModOsc2 = value;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateModOsc2( currentModOsc2 );
		}
	}
}




CWilsoWAMidiSynth.prototype.onUpdateFilterCutoff = function(ev) {

  if ( typeof ev !== 'undefined' ) {

  	var value = ev.currentTarget ? ev.currentTarget.value : ev;
  //	console.log( "currentFilterCutoff= " + currentFilterCutoff + "new cutoff= " + value );


  	//var value = value / 10;
  	//var value = 2000;

  	this.currentFilterCutoff = value;

    //console.log('onUpdateFilterCutoff', ev, value, this.voices);

  	for (var i=0; i<255; i++) {
  		if (this.voices[i] != null) {
  			this.voices[i].setFilterCutoff( value );
  		}
  	}

  }
}

CWilsoWAMidiSynth.prototype.onUpdateFilterQ = function(ev) {

  if ( typeof ev !== 'undefined' ) {  
  	var value = ev.currentTarget ? ev.currentTarget.value : ev;

  	var value = value / 5;

  	this.currentFilterQ = value;
  	for (var i=0; i<255; i++) {
  		if (this.voices[i] != null) {
  			this.voices[i].setFilterQ( value );
  		}
  	}
  }
}

CWilsoWAMidiSynth.prototype.onUpdateFilterMod = function(ev) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	this.currentFilterMod = value;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].setFilterMod( value );
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateFilterEnv = function(ev) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	this.currentFilterEnv = value;
}




CWilsoWAMidiSynth.prototype.onUpdateOsc1Wave = function(ev) {
	this.currentOsc1Waveform = Math.round(ev); //ev.target.selectedIndex;

	//console.log('onUpdateOsc1Wave', ev, waveforms[this.currentOsc1Waveform]);

	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].setOsc1Waveform( waveforms[this.currentOsc1Waveform] );
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateOsc1Octave = function(ev) {
	this.currentOsc1Octave = ev.target.selectedIndex;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateOsc1Frequency();
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateOsc1Detune = function(ev) {
	var value = ev.currentTarget.value;
	this.currentOsc1Detune = value;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateOsc1Frequency();
		}
	}
}

CWilsoWAMidiSynth.prototype.onUpdateOsc1Mix = function(value) {
  if ( typeof value !== 'undefined' ) {
  	if (value.currentTarget)
  		value = value.currentTarget.value;
  	this.currentOsc1Mix = value;
  	for (var i=0; i<255; i++) {
  		if (this.voices[i] != null) {
  			this.voices[i].updateOsc1Mix( value );
  		}
  	}
  }  
}




CWilsoWAMidiSynth.prototype.onUpdateOsc2Wave = function(ev) {
	this.currentOsc2Waveform = Math.round(ev); // ev.target.selectedIndex;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].setOsc2Waveform( waveforms[this.currentOsc2Waveform] );
		}
	}
}


CWilsoWAMidiSynth.prototype.onUpdateOsc2Octave = function(ev) {
	this.currentOsc2Octave = ev.target.selectedIndex;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateOsc2Frequency();
		}
	}
}


CWilsoWAMidiSynth.prototype.onUpdateOsc2Detune = function(ev) {
	var value = ev; // ev.currentTarget.value;
	this.currentOsc2Detune = value;
	for (var i=0; i<255; i++) {
		if (this.voices[i] != null) {
			this.voices[i].updateOsc2Frequency();
		}
	}
}


CWilsoWAMidiSynth.prototype.onUpdateOsc2Mix = function(value) {

  if ( typeof value !== 'undefined' ) {
    if (value.currentTarget)
      value = value.currentTarget.value;  
  	this.currentOsc2Mix = value;
  	for (var i=0; i<255; i++) {
  		if (this.voices[i] != null) {
  			this.voices[i].updateOsc2Mix( value );
  		}
  	}
  }
}




CWilsoWAMidiSynth.prototype.onUpdateEnvA = function(ev) {
	this.currentEnvA = ev; //ev.currentTarget.value;
}

CWilsoWAMidiSynth.prototype.onUpdateEnvD = function(ev) {
	this.currentEnvD = ev; //ev.currentTarget.value;
}

CWilsoWAMidiSynth.prototype.onUpdateEnvS = function(ev) {
	this.currentEnvS = ev; //ev.currentTarget.value;
}

CWilsoWAMidiSynth.prototype.onUpdateEnvR = function(ev) {
	this.currentEnvR = ev; //ev.currentTarget.value;
}




CWilsoWAMidiSynth.prototype.onUpdateFilterEnvA = function(ev) {
	this.currentFilterEnvA = ev; //ev.currentTarget.value;
}

CWilsoWAMidiSynth.prototype.onUpdateFilterEnvD = function(ev) {
	this.currentFilterEnvD = ev; //ev.currentTarget.value;
}

CWilsoWAMidiSynth.prototype.onUpdateFilterEnvS = function(ev) {
	this.currentFilterEnvS = ev; //ev.currentTarget.value;
}

CWilsoWAMidiSynth.prototype.onUpdateFilterEnvR = function(ev) {
	this.currentFilterEnvR = ev; //ev.currentTarget.value;
}





CWilsoWAMidiSynth.prototype.onUpdateDrive = function(value) {
  //console.log('value onUpdateDrive',value);
	currentDrive = value;
    this.waveshaper.setDrive( 0.01 + (currentDrive*currentDrive/500.0) );
}

CWilsoWAMidiSynth.prototype.onUpdateVolume = function(ev) {

  let valCheckkk3479 = parseFloat(ev);

  if ( isFinite(valCheckkk3479) ) {
    var euve = (ev.currentTarget ? ev.currentTarget.value : ev)/100;

  } else {    
    var euve = 0.4;
  }

  this.volNode.gain.value = euve;

	//this.volNode.gain.value = (ev.currentTarget ? ev.currentTarget.value : ev)/100; // ev/100; //
  //console.log('onUpdateVolume:', ev, this.volNode.gain.value);
}


CWilsoWAMidiSynth.prototype.onUpdateReverb = function(ev) {
	var value = ev.currentTarget ? ev.currentTarget.value : ev;
	value = value/100;

	// equal-power crossfade
	var gain1 = Math.cos(value * 0.5*Math.PI);
	var gain2 = Math.cos((1.0-value) * 0.5*Math.PI);

	this.revBypassGain.gain.value = gain1;
	this.revGain.gain.value = gain2;
}

/*
var FOURIER_SIZE = 2048;
var wave = false;

	if ( wave ) {
		var real = new Float32Array(FOURIER_SIZE);
		var imag = new Float32Array(FOURIER_SIZE);
		real[0] = 0.0;
		imag[0] = 0.0;

		for (var i=1; i<FOURIER_SIZE; i++) {
			real[i]=1.0;
			imag[i]=1.0;
		}

		var wavetable = audioContext.createWaveTable(real, imag);
		oscillatorNode.setWaveTable(wavetable);
	} else {

*/

function filterFrequencyFromCutoff( pitch, cutoff ) {
    var nyquist = 0.5 * audioContext.sampleRate;

    var filterFrequency = Math.pow(2, (9 * cutoff) - 1) * pitch;
    if (filterFrequency > nyquist)
        filterFrequency = nyquist;
	return filterFrequency;
}





var Voice = function(note, velocity, channelId) { // CWilsoWAMidiSynth.prototype.

  var synthInstance = 'channel_' + channelId;
  audioContext = window[synthInstance].context;

  this.instance = window[synthInstance];

	this.originalFrequency = frequencyFromNoteNumber( note );

	// create osc 1
	this.osc1 = audioContext.createOscillator();
	this.updateOsc1Frequency();


  if ( typeof waveforms[this.instance.currentOsc1Waveform] == 'undefined' ) {
    var wafo = "triangle"; // default preset param
  } else {
    var wafo = waveforms[this.instance.currentOsc1Waveform];
  }  

	//this.osc1.type = waveforms[this.instance.currentOsc1Waveform];
  this.osc1.type = wafo;

	this.osc1Gain = audioContext.createGain();
	this.osc1Gain.gain.value = 0.005 * this.instance.currentOsc1Mix;
  //	this.osc1Gain.gain.value = 0.05 + (0.33 * velocity);
	this.osc1.connect( this.osc1Gain );

	// create osc 2
	this.osc2 = audioContext.createOscillator();
	this.updateOsc2Frequency();



  if ( typeof waveforms[this.instance.currentOsc2Waveform] == 'undefined' ) {
    var wafo = "triangle"; // default preset param
  } else {
    var wafo = waveforms[this.instance.currentOsc2Waveform];
  }  

  //this.osc2.type = waveforms[this.instance.currentOsc2Waveform];
  this.osc2.type = wafo;

	this.osc2Gain = audioContext.createGain();
	this.osc2Gain.gain.value = 0.005 * this.instance.currentOsc2Mix;
  //	this.osc2Gain.gain.value = 0.05 + (0.33 * velocity);
	this.osc2.connect( this.osc2Gain );

	// create modulator osc
	this.modOsc = audioContext.createOscillator();
	this.modOsc.type = 	waveforms[this.instance.currentModWaveform];
	this.modOsc.frequency.value = this.instance.currentModFrequency * this.instance.modOscFreqMultiplier;

	this.modOsc1Gain = audioContext.createGain();
	this.modOsc.connect( this.modOsc1Gain );
	this.modOsc1Gain.gain.value = this.instance.currentModOsc1/10;
	this.modOsc1Gain.connect( this.osc1.frequency );	// tremolo

	this.modOsc2Gain = audioContext.createGain();
	this.modOsc.connect( this.modOsc2Gain );
	this.modOsc2Gain.gain.value = this.instance.currentModOsc2/10;
	this.modOsc2Gain.connect( this.osc2.frequency );	// tremolo

	// create the LP filter
	this.filter1 = audioContext.createBiquadFilter();
	this.filter1.type = "lowpass";
	this.filter1.Q.value = this.instance.currentFilterQ;


	//this.filter1.frequency.value = Math.pow(2, this.instance.currentFilterCutoff); 
	this.filter1.frequency.value = this.instance.currentFilterCutoff * 140; 
	this.filter1.frequency.value = this.instance.sf[this.instance.currentFilterCutoff];
	// use linear slider step 100 to logarythmic 20 hz 15khz range conversion formula instead
	// or use map 0: 20hz 100: 14000hz


	// filterFrequencyFromCutoff( this.originalFrequency, currentFilterCutoff );
  //	console.log( "filter frequency: " + this.filter1.frequency.value);
	this.filter2 = audioContext.createBiquadFilter();
	this.filter2.type = "lowpass";
	this.filter2.Q.value = this.instance.currentFilterQ;


	//this.filter2.frequency.value = Math.pow(2, this.instance.currentFilterCutoff); 
	//this.filter2.frequency.value = this.instance.currentFilterCutoff * 140;
	this.filter2.frequency.value = this.instance.sf[this.instance.currentFilterCutoff];

	this.osc1Gain.connect( this.filter1 );
	this.osc2Gain.connect( this.filter1 );
	this.filter1.connect( this.filter2 );

	// connect the modulator to the filters
	this.modFilterGain = audioContext.createGain();
	this.modOsc.connect( this.modFilterGain );
	this.modFilterGain.gain.value = this.instance.currentFilterMod*24;
  //	console.log("modFilterGain=" + currentFilterMod*24);
	this.modFilterGain.connect( this.filter1.detune );	// filter tremolo
	this.modFilterGain.connect( this.filter2.detune );	// filter tremolo

	// create the volume envelope
	this.envelope = audioContext.createGain();
	this.filter2.connect( this.envelope );
	this.envelope.connect( window[synthInstance].effectChain );

	// set up the volume and filter envelopes
	var now = audioContext.currentTime;


  if ( typeof this.instance.currentEnvA == 'undefined' ) {
    var currEnvA = 21; // default preset param - 40
    currEnvA = 21;
    this.instance.currentEnvA = 21;
  } else {
    var currEnvA = this.instance.currentEnvA;
  }  


  var envAttackEnd = now + (currEnvA/20.0);



	this.envelope.gain.value = 0.0;
	this.envelope.gain.setValueAtTime( 0.0, now );

  let valCheckkk = parseFloat(envAttackEnd);

  //console.log('envAttackEnd: ', valCheckkk, this.instance.currentEnvA, now);

  if ( isFinite(valCheckkk) ) {
    this.envelope.gain.linearRampToValueAtTime( 1.0, envAttackEnd );
  } else {    
    this.envelope.gain.linearRampToValueAtTime( 1.0, 1.0 );
    return;
    alert('CWilso polysynth probably encountered a bug. Please refresh your browser page.');
  }

  //console.log('log:: ', this.instance.currentEnvS, envAttackEnd, this.instance.currentEnvD);


  if ( typeof this.instance.currentEnvS == 'undefined' ) {
    this.instance.currentEnvS = 101; // default preset param 200
  } 

  if ( typeof this.instance.currentEnvD == 'undefined' ) {
    this.instance.currentEnvD = 101; // default preset param 180
  } 

	//this.envelope.gain.linearRampToValueAtTime( 1.0, envAttackEnd );
	this.envelope.gain.setTargetAtTime( (this.instance.currentEnvS/100.0), envAttackEnd, (this.instance.currentEnvD/100.0)+0.001 );

	var filterAttackLevel = this.instance.currentFilterEnv*72;  // Range: 0-7200: 6-octave range
	var filterSustainLevel = filterAttackLevel* this.instance.currentFilterEnvS / 100.0; // range: 0-7200
	var filterAttackEnd = (this.instance.currentFilterEnvA/20.0);

  /*	console.log( "filterAttackLevel: " + filterAttackLevel + 
  				 " filterSustainLevel: " + filterSustainLevel +
  				 " filterAttackEnd: " + filterAttackEnd);
  */

  //console.log('filter env decay: ', this.instance.currentFilterEnvD);

	if (!filterAttackEnd) 
				filterAttackEnd=0.05; // tweak to get target decay to work properly
	this.filter1.detune.setValueAtTime( 0, now );
	this.filter1.detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );
	this.filter2.detune.setValueAtTime( 0, now );
	this.filter2.detune.linearRampToValueAtTime( filterAttackLevel, now+filterAttackEnd );


  //console.log('log:: ', filterSustainLevel, filterAttackEnd, this.instance.currentFilterEnvD);

  if ( typeof this.instance.currentFilterEnvD == 'undefined' ) {
    this.instance.currentFilterEnvD = 101; // default preset param 140
  }   

  let valCheckkk2 = parseFloat(filterSustainLevel);


  if ( isFinite(valCheckkk2) ) {
  } else {    
    filterSustainLevel = 0.6; // default preset param
  }


	this.filter1.detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.instance.currentFilterEnvD/100.0) );
	this.filter2.detune.setTargetAtTime( filterSustainLevel, now+filterAttackEnd, (this.instance.currentFilterEnvD/100.0) );

	this.osc1.start(0);

  // if on mobile: only load 1 oscillator
  if (!window.mobilecheck()) {
	 this.osc2.start(0);
  }

	this.modOsc.start(0);
}


Voice.prototype.setModWaveform = function( value ) {
	this.modOsc.type = value;
}

Voice.prototype.updateModFrequency = function( value ) {
	this.modOsc.frequency.value = value;
}

Voice.prototype.updateModOsc1 = function( value ) {
	this.modOsc1Gain.gain.value = value/10;
}

Voice.prototype.updateModOsc2 = function( value ) {
	this.modOsc2Gain.gain.value = value/10;
}

Voice.prototype.setOsc1Waveform = function( value ) {
	this.osc1.type = value;
}

Voice.prototype.updateOsc1Frequency = function( value ) {
	this.osc1.frequency.value = (this.originalFrequency*Math.pow(2,this.instance.currentOsc1Octave-2));  // -2 because osc1 is 32', 16', 8'
	this.osc1.detune.value = this.instance.currentOsc1Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
}

Voice.prototype.updateOsc1Mix = function( value ) {
	this.osc1Gain.gain.value = 0.005 * value;
}

Voice.prototype.setOsc2Waveform = function( value ) {
	this.osc2.type = value;
}

Voice.prototype.updateOsc2Frequency = function( value ) {
	this.osc2.frequency.value = (this.originalFrequency*Math.pow(2,this.instance.currentOsc2Octave-1));


  //console.log('osc2 detune val: ', this.instance.currentOsc2Detune, currentPitchWheel, this.osc2.detune.value, this.osc2.frequency.value); // this.osc1.frequency.value, this.osc2.frequency.value, 		

  var detVaal = this.instance.currentOsc2Detune + currentPitchWheel * 500;

  let valCheckkk = parseFloat(detVaal);

  //console.log('currentOsc2Detune + currentPitchWheel * 500: ', detVaal);

  if ( isFinite(valCheckkk) ) {
    this.osc2.detune.value = detVaal * 12; // adds a not per '10' value step
  } else {    
    this.osc2.detune.value = 0; // default preset param
  }

	//this.osc2.detune.value = this.instance.currentOsc2Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
}

Voice.prototype.updateOsc2Mix = function( value ) {
	this.osc2Gain.gain.value = 0.005 * value;
}

Voice.prototype.setFilterCutoff = function( value ) {
  //console.log('setFilterCutoff', value);
	var now =  audioContext.currentTime;

	//var value = value /1000;

	//var filterFrequency = Math.pow(2, value);
	//var filterFrequency = value * 140; // 
	var filterFrequency = this.instance.sf[value];

//console.log("Filter cutoff: orig:" + this.filter1.frequency.value + " new:" + filterFrequency + " value: " + value );

	this.filter1.frequency.value = filterFrequency;
	this.filter2.frequency.value = filterFrequency;
}

Voice.prototype.setFilterQ = function( value ) {
	this.filter1.Q.value = value;
	this.filter2.Q.value = value;
}

Voice.prototype.setFilterMod = function( value ) {
	this.modFilterGain.gain.value = currentFilterMod*24;
//	console.log( "filterMod.gain=" + currentFilterMod*24);
}

Voice.prototype.noteOff = function() {
	var now =  audioContext.currentTime;
	var release = now + (this.instance.currentEnvR/10.0);	
    var initFilter = filterFrequencyFromCutoff( this.originalFrequency, this.instance.currentFilterCutoff/100 * (1.0-(this.instance.currentFilterEnv/100)) );

    // ori april 5th '21:
    //var initFilter = filterFrequencyFromCutoff( this.originalFrequency, this.instance.currentFilterCutoff/100 * (1.0-(this.instance.currentFilterEnv/100.0)) );

//    console.log("noteoff: now: " + now + " val: " + this.filter1.frequency.value + " initF: " + initFilter + " fR: " + currentFilterEnvR/100 );
	this.envelope.gain.cancelScheduledValues(now);
	this.envelope.gain.setValueAtTime( this.envelope.gain.value, now );  // this is necessary because of the linear ramp

  

  if ( typeof this.instance.currentEnvR == 'undefined' ) {
    this.instance.currentEnvR = 1; // default preset param - 280
  } else {
    let valCheckkkEnvR = parseFloat(this.instance.currentEnvR);

    if ( isFinite(valCheckkkEnvR) && valCheckkkEnvR > 0 ) {

    } else {    
      this.instance.currentEnvR = 1;
    }    
  }



  //console.log('log:: ', now, this.instance.currentEnvR);
	this.envelope.gain.setTargetAtTime(0.0, now, (this.instance.currentEnvR/100));
	this.filter1.detune.cancelScheduledValues(now);


  /*if ( typeof this.instance.currentFilterEnvR == 'undefined' ) {
    this.instance.currentFilterEnvR = 101; // default preset param - 210
  } */


  if ( typeof this.instance.currentFilterEnvR == 'undefined' ) {
    this.instance.currentFilterEnvR = 1; 
  } else {
    let valCheckcurrentFilterEnvR = parseFloat(this.instance.currentFilterEnvR);

    if ( isFinite(valCheckcurrentFilterEnvR) && valCheckcurrentFilterEnvR > 0 ) {

    } else {    
      this.instance.currentFilterEnvR = 1;
    }    
  }




	this.filter1.detune.setTargetAtTime( 0, now, (this.instance.currentFilterEnvR/100.0) );


	this.filter2.detune.cancelScheduledValues(now);
	this.filter2.detune.setTargetAtTime( 0, now, (this.instance.currentFilterEnvR/100.0) );

  //console.log('log:: ', release);


  let valCheckkk3 = parseFloat(release);


  if ( isFinite(valCheckkk3) ) {
  } else {    
    release = 0.6; // default preset param
  }


	this.osc1.stop( release );
	this.osc2.stop( release );

//this.context.disconnect();
}



function changeModMultiplier() {
	modOscFreqMultiplier = (moDouble?2:1)*(moQuadruple?4:1);
	onUpdateModFrequency( currentModFrequency );
}

function onChangeOctave( ev ) {
	currentOctave = ev.target.selectedIndex;
}


/*
if('serviceWorker' in navigator) {  
  navigator.serviceWorker  
           .register('./service-worker.js')  
           .then(function() { console.log('Service Worker Registered'); });  
}*/
//window.onload=initAudio;
