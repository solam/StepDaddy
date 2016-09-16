(function() {

  mixr.Sequencer = function(conn) {

    /**
     * Mixins
     */
    mixr.mixins.EventTarget.call(this);

    var _clients = {};
    var _instruments = [];
    //this._instruments = _instruments;
    var _availableInstruments = [];
    //this._availableInstruments = _availableInstruments;
    //window._availableInstruments = _availableInstruments;
    var _tracks = {};

    //this._instrumentsSoundModes = [];

    var _patterns = [];
    this._patterns = [];
    this._systemPatterns = [];
    //window.systemPatterns = [];

    this._patternSequencer = [];

    var _presets = [];
    this._presets = [];
    this._systemPresets = [];    

    //var _trackSet = {}; // track kit

    var _context = null;
    var _masterGainNode = null;

    var _currentTime = 0;
    var _noteTime = 1;
    this._noteTime = 1;

    this._noteTimes = [];
    //this._noteTimes[0] = 0;
    this._noteChannelIndex = [];

    this._noteTrigger = 1;
    this._noteTriggers = [];

    var _timeGrid = 1;
    var _noteIndex = 0;
    var _startTime = 0;
    this._startTime = 0;
    //var _tempo = 110;
    

    this._Ins01Volume = 1;

    var startDate = new Date();
    this._audioServerStartTimestamp = startDate.getTime();

    
    


    //this._synthFreq = 20;
    var _loopLength = 16;
    var _started = false;
    var _lastDrawTime = -1;

    var _self = this;
    var _clients = {};

    var samplesPath = '../common/resources/';


    this.interpolate2 = function(value, outputMin, outputMax, displayedMin, displayedMax) {
        //console.log('interpolate:', valueX);
        return (outputMin + (outputMax - outputMin) * value) / displayedMax;
        // (0 + (1-0) * 50)100 : 0.5
        // what to do if outputMax is greater than displayedMax ?
    }  


    //var this._instrumentsConfig = window.insConf02;
    //window['insConf'] = window.insConf2;


    //
    //window['sessionNumber'] = 2;  

     window.graphixMode = 0; // ven 16 step 2016: 0 > 1 > 1

    this._countdownMode = 1; // ven 16 step 2016: 0 puis 1 > 1 > 1      // 0: direc access mode | 1: some channel users may have to wait before their patern editor is fully visible (as to delay their contribution to the current session) 

    this._sessionNumber = 6; // ven 16 step 2016: 6 > 5 > 1
/*

1: Pitch instruments A (for apéro SdCC janvier 2016)
2: Batucada (for apéro SdCC juin 2016)
3: The Chase (draft, only 4 channels)
4: Summerlab (using lab sounds)
5: perf NDW 2016 
6: workshop NDW 2016 
99: test

*/
    this._instrumentsConfig = window['insConf' + this._sessionNumber]; //window.insConf;
    window['insConf'] = this._instrumentsConfig; // window.insConf2 - select which session to select at app startup

    //console.log('session number: ', this._sessionNumber, this._instrumentsConfig);


    this._tempo = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[7].x.value //109; // 110 // ! hardcoded value: conductor channel + control id may change !

    //this._insVol0 = 0.7; // ch1 vol retrieve from window.insConf (conductor role) via trackset value

    var insVol0X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[0].x; // ! hardcoded value: conductor channel + control id may change !
    this._insVol0 = this.interpolate2(insVol0X.value, insVol0X.min, insVol0X.max, insVol0X.displayedRangeMin, insVol0X.displayedRangeMax);    

    var insVol2X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol2 = this.interpolate2(insVol2X.value, insVol2X.min, insVol2X.max, insVol2X.displayedRangeMin, insVol2X.displayedRangeMax);

    var insVol3X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol3 = this.interpolate2(insVol3X.value, insVol3X.min, insVol3X.max, insVol3X.displayedRangeMin, insVol3X.displayedRangeMax);

    var insVol4X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol4 = this.interpolate2(insVol4X.value, insVol4X.min, insVol4X.max, insVol4X.displayedRangeMin, insVol4X.displayedRangeMax);    

    var insVol5X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol5 = this.interpolate2(insVol5X.value, insVol5X.min, insVol5X.max, insVol5X.displayedRangeMin, insVol5X.displayedRangeMax);        

    var insVol6X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol6 = this.interpolate2(insVol6X.value, insVol6X.min, insVol6X.max, insVol6X.displayedRangeMin, insVol6X.displayedRangeMax);    

    var insVol7X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol7 = this.interpolate2(insVol7X.value, insVol7X.min, insVol7X.max, insVol7X.displayedRangeMin, insVol7X.displayedRangeMax);                

    //this._insVol2 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[2].x.value;
    //console.log("bpm", this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[7].x);

    //this._insBarOffset = [];
    this._insBarOffset0 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[10].x.value; // ! hardcoded value - this._insBarOffset[0]
    this._insBarOffset1 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[11].x.value;
    this._insBarOffset2 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[12].x.value;
    this._insBarOffset3 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[13].x.value;
    this._insBarOffset4 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[14].x.value;
    this._insBarOffset5 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[15].x.value;  
    this._insBarOffset6 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[16].x.value;
    this._insBarOffset7 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[17].x.value;


    this._channelName = [];


    this._channelName[0]= [];
    this._channelName[1]= [];
    this._channelName[2]= [];
    this._channelName[3]= [];
    this._channelName[4]= [];
    this._channelName[5]= [];
    this._channelName[6]= [];
    this._channelName[7]= [];

    /*this._channelName[0]['name']= this._instrumentsConfig[0].channelName;
    this._channelName[1]['name']= this._instrumentsConfig[1].channelName;
    this._channelName[2]['name']= this._instrumentsConfig[2].channelName;
    this._channelName[3]['name']= this._instrumentsConfig[3].channelName;*/



    if (typeof this._instrumentsConfig[0] !== 'undefined') {this._channelName[0]['name']= this._instrumentsConfig[0].channelName; }
    if (typeof this._instrumentsConfig[1] !== 'undefined') {this._channelName[1]['name']= this._instrumentsConfig[1].channelName; }
    if (typeof this._instrumentsConfig[2] !== 'undefined') {this._channelName[2]['name']= this._instrumentsConfig[2].channelName; }
    if (typeof this._instrumentsConfig[3] !== 'undefined') {this._channelName[3]['name']= this._instrumentsConfig[3].channelName; }
    if (typeof this._instrumentsConfig[4] !== 'undefined') {this._channelName[4]['name']= this._instrumentsConfig[4].channelName; }
    if (typeof this._instrumentsConfig[5] !== 'undefined') {this._channelName[5]['name']= this._instrumentsConfig[5].channelName; }
    if (typeof this._instrumentsConfig[6] !== 'undefined') {this._channelName[6]['name']= this._instrumentsConfig[6].channelName; }
    if (typeof this._instrumentsConfig[7] !== 'undefined') {this._channelName[7]['name']= this._instrumentsConfig[7].channelName; }

    /*this._channelName[0]['color']= this._instrumentsConfig[0].conf[0]['color'];
    this._channelName[1]['color']= this._instrumentsConfig[1].conf[0]['color'];
    this._channelName[2]['color']= this._instrumentsConfig[2].conf[0]['color'];
    this._channelName[3]['color']= this._instrumentsConfig[3].conf[0]['color'];*/




    if (typeof this._instrumentsConfig[0] !== 'undefined') {this._channelName[0]['color']= this._instrumentsConfig[0].conf[0]['color']; }
    if (typeof this._instrumentsConfig[1] !== 'undefined') {this._channelName[1]['color']= this._instrumentsConfig[1].conf[0]['color']; }
    if (typeof this._instrumentsConfig[2] !== 'undefined') {this._channelName[2]['color']= this._instrumentsConfig[2].conf[0]['color']; }
    if (typeof this._instrumentsConfig[3] !== 'undefined') {this._channelName[3]['color']= this._instrumentsConfig[3].conf[0]['color']; }        
    if (typeof this._instrumentsConfig[4] !== 'undefined') {this._channelName[4]['color']= this._instrumentsConfig[4].conf[0]['color']; }
    if (typeof this._instrumentsConfig[5] !== 'undefined') {this._channelName[5]['color']= this._instrumentsConfig[5].conf[0]['color']; }
    if (typeof this._instrumentsConfig[6] !== 'undefined') {this._channelName[6]['color']= this._instrumentsConfig[6].conf[0]['color']; }
    if (typeof this._instrumentsConfig[7] !== 'undefined') {this._channelName[7]['color']= this._instrumentsConfig[7].conf[0]['color']; }    

    //console.log('ch color:',this._channelName[0], this._channelName[0]['color']/*, this._instrumentsConfig[0].conf[0]['color']*/);

    this._channelPatterns = [];

    /*this._channelPatterns[0]= this._instrumentsConfig[0].patterns;
    this._channelPatterns[1]= this._instrumentsConfig[1].patterns;
    this._channelPatterns[2]= this._instrumentsConfig[2].patterns;
    this._channelPatterns[3]= this._instrumentsConfig[3].patterns;*/


    if (typeof this._instrumentsConfig[0] !== 'undefined') {this._channelPatterns[0]= this._instrumentsConfig[0].patterns; }
    if (typeof this._instrumentsConfig[1] !== 'undefined') {this._channelPatterns[1]= this._instrumentsConfig[1].patterns; }
    if (typeof this._instrumentsConfig[2] !== 'undefined') {this._channelPatterns[2]= this._instrumentsConfig[2].patterns; }
    if (typeof this._instrumentsConfig[3] !== 'undefined') {this._channelPatterns[3]= this._instrumentsConfig[3].patterns; } 
    if (typeof this._instrumentsConfig[4] !== 'undefined') {this._channelPatterns[4]= this._instrumentsConfig[4].patterns; }
    if (typeof this._instrumentsConfig[5] !== 'undefined') {this._channelPatterns[5]= this._instrumentsConfig[5].patterns; }
    if (typeof this._instrumentsConfig[6] !== 'undefined') {this._channelPatterns[6]= this._instrumentsConfig[6].patterns; }
    if (typeof this._instrumentsConfig[7] !== 'undefined') {this._channelPatterns[7]= this._instrumentsConfig[7].patterns; } 

    var achannelPatterns = [];
     /*achannelPatterns[0]= JSON.stringify(this._instrumentsConfig[0].patterns);
     achannelPatterns[1]= JSON.stringify(this._instrumentsConfig[1].patterns);
     achannelPatterns[2]= JSON.stringify(this._instrumentsConfig[2].patterns);
     achannelPatterns[3]= JSON.stringify(this._instrumentsConfig[3].patterns);*/




     if (typeof this._instrumentsConfig[0] !== 'undefined') {achannelPatterns[0]= JSON.stringify(this._instrumentsConfig[0].patterns); }
     if (typeof this._instrumentsConfig[1] !== 'undefined') {achannelPatterns[1]= JSON.stringify(this._instrumentsConfig[1].patterns); }
     if (typeof this._instrumentsConfig[2] !== 'undefined') {achannelPatterns[2]= JSON.stringify(this._instrumentsConfig[2].patterns); }
     if (typeof this._instrumentsConfig[3] !== 'undefined') {achannelPatterns[3]= JSON.stringify(this._instrumentsConfig[3].patterns); }     
     if (typeof this._instrumentsConfig[4] !== 'undefined') {achannelPatterns[4]= JSON.stringify(this._instrumentsConfig[4].patterns); }
     if (typeof this._instrumentsConfig[5] !== 'undefined') {achannelPatterns[5]= JSON.stringify(this._instrumentsConfig[5].patterns); }
     if (typeof this._instrumentsConfig[6] !== 'undefined') {achannelPatterns[6]= JSON.stringify(this._instrumentsConfig[6].patterns); }
     if (typeof this._instrumentsConfig[7] !== 'undefined') {achannelPatterns[7]= JSON.stringify(this._instrumentsConfig[7].patterns); }
 






    this._channelPresets = [];
    /*this._channelPresets[0]= this._instrumentsConfig[0].presets;
    this._channelPresets[1]= this._instrumentsConfig[1].presets;
    this._channelPresets[2]= this._instrumentsConfig[2].presets;
    this._channelPresets[3]= this._instrumentsConfig[3].presets;*/


    if (typeof this._instrumentsConfig[0] !== 'undefined') {this._channelPresets[0]= this._instrumentsConfig[0].presets; }
    if (typeof this._instrumentsConfig[1] !== 'undefined') {this._channelPresets[1]= this._instrumentsConfig[1].presets; }
    if (typeof this._instrumentsConfig[2] !== 'undefined') {this._channelPresets[2]= this._instrumentsConfig[2].presets; }
    if (typeof this._instrumentsConfig[3] !== 'undefined') {this._channelPresets[3]= this._instrumentsConfig[3].presets; } 
    if (typeof this._instrumentsConfig[4] !== 'undefined') {this._channelPresets[4]= this._instrumentsConfig[4].presets; }
    if (typeof this._instrumentsConfig[5] !== 'undefined') {this._channelPresets[5]= this._instrumentsConfig[5].presets; }
    if (typeof this._instrumentsConfig[6] !== 'undefined') {this._channelPresets[6]= this._instrumentsConfig[6].presets; }
    if (typeof this._instrumentsConfig[7] !== 'undefined') {this._channelPresets[7]= this._instrumentsConfig[7].presets; } 

    var achannelPresets = [];
     /*achannelPresets[0]= JSON.stringify(this._instrumentsConfig[0].presets);
     achannelPresets[1]= JSON.stringify(this._instrumentsConfig[1].presets);
     achannelPresets[2]= JSON.stringify(this._instrumentsConfig[2].presets);
     achannelPresets[3]= JSON.stringify(this._instrumentsConfig[3].presets);*/






     if (typeof this._instrumentsConfig[0] !== 'undefined') {achannelPresets[0]= JSON.stringify(this._instrumentsConfig[0].presets); }
     if (typeof this._instrumentsConfig[1] !== 'undefined') {achannelPresets[1]= JSON.stringify(this._instrumentsConfig[1].presets); }
     if (typeof this._instrumentsConfig[2] !== 'undefined') {achannelPresets[2]= JSON.stringify(this._instrumentsConfig[2].presets); }
     if (typeof this._instrumentsConfig[3] !== 'undefined') {achannelPresets[3]= JSON.stringify(this._instrumentsConfig[3].presets); }     
     if (typeof this._instrumentsConfig[4] !== 'undefined') {achannelPresets[4]= JSON.stringify(this._instrumentsConfig[4].presets); }
     if (typeof this._instrumentsConfig[5] !== 'undefined') {achannelPresets[5]= JSON.stringify(this._instrumentsConfig[5].presets); }
     if (typeof this._instrumentsConfig[6] !== 'undefined') {achannelPresets[6]= JSON.stringify(this._instrumentsConfig[6].presets); }
     if (typeof this._instrumentsConfig[7] !== 'undefined') {achannelPresets[7]= JSON.stringify(this._instrumentsConfig[7].presets); }












    this._channelpatternSeq = [];


    /*this._channelpatternSeq[0]= this._instrumentsConfig[0].patternSeq;
    this._channelpatternSeq[1]= this._instrumentsConfig[1].patternSeq;
    this._channelpatternSeq[2]= this._instrumentsConfig[2].patternSeq;
    this._channelpatternSeq[3]= this._instrumentsConfig[3].patternSeq;*/



    if (typeof this._instrumentsConfig[0] !== 'undefined') {this._channelpatternSeq[0]= this._instrumentsConfig[0].patternSeq; }
    if (typeof this._instrumentsConfig[1] !== 'undefined') {this._channelpatternSeq[1]= this._instrumentsConfig[1].patternSeq; }
    if (typeof this._instrumentsConfig[2] !== 'undefined') {this._channelpatternSeq[2]= this._instrumentsConfig[2].patternSeq; }
    if (typeof this._instrumentsConfig[3] !== 'undefined') {this._channelpatternSeq[3]= this._instrumentsConfig[3].patternSeq; }      
    if (typeof this._instrumentsConfig[4] !== 'undefined') {this._channelpatternSeq[4]= this._instrumentsConfig[4].patternSeq; }
    if (typeof this._instrumentsConfig[5] !== 'undefined') {this._channelpatternSeq[5]= this._instrumentsConfig[5].patternSeq; }
    if (typeof this._instrumentsConfig[6] !== 'undefined') {this._channelpatternSeq[6]= this._instrumentsConfig[6].patternSeq; }
    if (typeof this._instrumentsConfig[7] !== 'undefined') {this._channelpatternSeq[7]= this._instrumentsConfig[7].patternSeq; }  


    //console.log('this._channelpatternSeq: ', this._channelpatternSeq);

    var achannelpatternSeq = [];


     /*achannelpatternSeq[0]= JSON.stringify(this._instrumentsConfig[0].patternSeq);
     achannelpatternSeq[1]= JSON.stringify(this._instrumentsConfig[1].patternSeq);
     achannelpatternSeq[2]= JSON.stringify(this._instrumentsConfig[2].patternSeq);
     achannelpatternSeq[3]= JSON.stringify(this._instrumentsConfig[3].patternSeq);*/





     if (typeof this._instrumentsConfig[0] !== 'undefined') {achannelpatternSeq[0]= JSON.stringify(this._instrumentsConfig[0].patternSeq); }
     if (typeof this._instrumentsConfig[1] !== 'undefined') {achannelpatternSeq[1]= JSON.stringify(this._instrumentsConfig[1].patternSeq); }
     if (typeof this._instrumentsConfig[2] !== 'undefined') {achannelpatternSeq[2]= JSON.stringify(this._instrumentsConfig[2].patternSeq); }
     if (typeof this._instrumentsConfig[3] !== 'undefined') {achannelpatternSeq[3]= JSON.stringify(this._instrumentsConfig[3].patternSeq); }
     if (typeof this._instrumentsConfig[4] !== 'undefined') {achannelpatternSeq[4]= JSON.stringify(this._instrumentsConfig[4].patternSeq); }
     if (typeof this._instrumentsConfig[5] !== 'undefined') {achannelpatternSeq[5]= JSON.stringify(this._instrumentsConfig[5].patternSeq); }
     if (typeof this._instrumentsConfig[6] !== 'undefined') {achannelpatternSeq[6]= JSON.stringify(this._instrumentsConfig[6].patternSeq); }
     if (typeof this._instrumentsConfig[7] !== 'undefined') {achannelpatternSeq[7]= JSON.stringify(this._instrumentsConfig[7].patternSeq); }









    if (this._countdownMode == 1) { 
      var sound = 0;  
    } else {
      var sound = 1;
    } 
    this._instrumentsSoundModes = [];
    this._instrumentsSoundModes[0]= sound;//this._instrumentsConfig[0].sound;
    this._instrumentsSoundModes[1]= sound;//this._instrumentsConfig[1].sound;
    this._instrumentsSoundModes[2]= sound;// this._instrumentsConfig[2].sound;
    this._instrumentsSoundModes[3]= sound;//this._instrumentsConfig[3].sound;
    this._instrumentsSoundModes[4]= sound;//this._instrumentsConfig[4].sound;
    this._instrumentsSoundModes[5]= sound;//this._instrumentsConfig[5].sound;
    this._instrumentsSoundModes[6]= sound;//this._instrumentsConfig[6].sound;
    this._instrumentsSoundModes[7]= sound;//this._instrumentsConfig[7].sound;
    this._instrumentsSoundModes[8]= sound;



    var defaultShift = 0;
    this._audioChannelShift = [];
    this._audioChannelShift[0]= 0;
this._audioChannelShift[1]= 0; // -12.5
    this._audioChannelShift[2]= 0;
    this._audioChannelShift[3]= 0; // 35
    this._audioChannelShift[4]= 0;
    this._audioChannelShift[5]= defaultShift;
    this._audioChannelShift[6]= 0;
    this._audioChannelShift[7]= 0;
    this._audioChannelShift[8]= defaultShift;    
    

    //var ptns = this._channelPatterns;  

    //console.log(this._insBarOffset[0]);
    //console.log(this._channelPatterns); // this._channelName
    window.chPatternsAtStartup = achannelPatterns;

    window.chPresetsAtStartup = achannelPresets;

    this._insKickoutTime = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[18].x.value; // ! hardcoded value

    this._channelInfo = [];
    this._channelInfo['bpm']=this._tempo;
    this._channelInfo['serverStartTime']=this._audioServerStartTimestamp;
    this._channelInfo['kickoutTime']=this._insKickoutTime;

    //window.generalChannelInfo = this._channelInfo;
    
    //console.log(this._channelInfo);


    this._sessionList = [];

    for (var a=1; a<99; a++) {
      if (typeof window['insConf'+a] !== 'undefined') {
        this._sessionList.push(window['insConf'+a][0].sessionName);
      }
    }

    //this._sessionListSerialized = JSON.stringify(this._sessionList);

//console.log('this._sessionList', this._sessionList);

    var _lowpassFilter = null;
    var _compressor = null;
    var _masterDry = null;
    var _masterWet = null;
    var _masterDelaySend = null;
    var _delay = null;
    var _reverb = null;
    var _highpassFilter = null;

    var _highpassFilterFreq = 0;
    this._filterFreq = 22000;
    this._playbackRate = 1;
    this._q = 1;
    this._empty = null;
    var _filterCutoff = 22000;

    var _delayAmount = 0.125;
    this._delayTime = 0;

    var effectsConfig = window.fxConf;
    

    // FX

    this.initialize = function() {

        // Create context.
        _context = new AudioContext();
        //window['audio_context'] = _context;

        //window['audio_rec_gal'] = new Recorder(_context);


/*
          TANGUY = new TANGUY(_context); // TANGUYGenerator
          TANGUY.build_synth();
          TANGUY.order_programs();
*/


        // Create master gain control.
        _masterGainNode = _context.createGain();
        _masterGainNode.gain.value = 0.7;

//window['audio_context'] = _compressor; // _masterGainNode; // _context.destination

        //create lowpass filter
       /* _lowpassFilter = _context.createBiquadFilter();
        _lowpassFilter.frequency.value = 300;
        _lowpassFilter.Q.value = 300; */
        // _masterGainNode.connect(_lowpassFilter);

        //create lowpass filter
        // _highpassFilter = _context.createBiquadFilter();
        // _highpassFilter.type = 1;
        // _highpassFilter.frequency.value = _highpassFilterFreq;

        //create compressor
         _compressor = _context.createDynamicsCompressor();
         _compressor.treshold = -20;
         _compressor.attack = 1;
         _compressor.release = 250;
         _compressor.ratio = 4;
         _compressor.knee = 5;


        // Create master gain control.
        _compressor.connect(_context.destination);
    //_lowpassFilter.connect(_compressor);
    //_masterGainNode.connect(_lowpassFilter);
    _masterGainNode.connect(_compressor);

        window['audio_context'] = _compressor; // _masterGainNode; // _context.destination; causes recorder.js:72 Uncaught IndexSizeError: Failed to execute 'connect' on 'AudioNode': output index (0) exceeds number of outputs (0).


        // Create master wet and dry.
        // _masterDry = _context.createGain();
        // _masterWet = _context.createGain();
        // _masterDelaySend = _context.createGain();
        // _masterDry.gain.value = 1;
        // _masterWet.gain.value = 0;

        // Create delay
        // _delay = _context.createDelay();

        // Create reverb
        // _reverb = _context.createConvolver();

        // _compressor.connect(_context.destination);
        // Connect master dry and wet to compressor.
        // _masterDry.connect(_compressor);
        // _masterWet.connect(_compressor);
        // _masterDelaySend.connect(_compressor);

        // Connect delay to master wet.
        // _delay.connect(_masterDelaySend);
        // _reverb.connect(_masterWet);

        //connect lowpass filter
        // _lowpassFilter.connect(_masterDry);
        // _lowpassFilter.connect(_masterWet);
        // _lowpassFilter.connect(_masterDelaySend);

        // _highpassFilter.connect(_lowpassFilter);
        // _masterGainNode.connect(_highpassFilter);



        //this.setFxValues();

        this.createInstruments();

        //console.log(this._audioServerStartTimestamp);
    };

    this.setFxValues = function() {

        // _delay.delayTime.value = _delayTime;
        // _masterDelaySend.gain.value = _delayAmount;
        _lowpassFilter.frequency.value = this._filterFreq;
        _lowpassFilter.Q.value = this._q;
        // console.log('_filterFreq', this._filterFreq, _lowpassFilter.frequency.value);
    }

    this.createInstruments = function() {
        _instruments = [];
        for (var i = 0; i < this._instrumentsConfig.length; i++) {
            //var tracks = this.createTracks(i, this._instrumentsConfig[i].tracks, this._instrumentsConfig[i].type);
            // this._instrumentsConfig[i].tracks[this._instrumentsConfig[i].trackSet]
            var type = this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type; 
            if (type=='control') {
              var tracks = [];
            } else {

              if (typeof this._instrumentsConfig[i].patterns !== 'undefined') {
                var pattern = this._instrumentsConfig[i].patterns[this._instrumentsConfig[i].defaultPattern].tracks;
                //console.log('ptn', pattern, this._instrumentsConfig[i].defaultPattern);
              } else {
                var pattern = null;
              }
                                           
              var tracks = this.createTracks(i, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].tracks, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type, pattern);
            }

            /*var channelInfo = this._channelInfo;
            channelInfo['barOffset']= this._insBarOffset[0]; //i 
            console.log("create ins: ", channelInfo);*/

            channelInfo = {};
            channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
            channelInfo.serverStartTime = this._audioServerStartTimestamp;
            channelInfo.kickoutTime = this._insKickoutTime;
            channelInfo.barOffset = eval('this._insBarOffset'+i); //this._insBarOffset[0]; - 
            channelInfo.countdownMode = this._countdownMode;
            channelInfo.channelName = this._channelName[i]['name'];
            channelInfo.channelNumber = i;
            channelInfo.channelColor = this._channelName[i]['color']; // 'testttt'; //
            channelInfo.sessionName = _self._sessionNumber-1; //this._sessionList[;
            channelInfo.sessionList = this._sessionList;//Serialized;


            if (typeof this._channelpatternSeq[i] !== 'undefined') {     
              //channelInfo.channelPatternSeq = [];            
              channelInfo.channelPatternSeqList= this._channelpatternSeq[i][this._instrumentsConfig[i].defaultPatternSeq]; //;

              //this._patternSequencer[i]['list'] = channelInfo.channelPatternSeqList;
              this._patternSequencer.push(channelInfo.channelPatternSeqList);

              //console.log("channelInfo.channelPatternSeq: ", this._patternSequencer); // channelInfo.channelPatternSeq
              //console.log("channelInfo.channelPatternSeq: ", channelInfo.channelPatternSeq, this._channelpatternSeq[i], this._channelpatternSeq[i]['defaultPatternSeq'] /*,channelInfo.channelPatternSeq*/);           
            }

                channelInfo.patterns = this._patterns;     
            channelInfo.channelPatterns = this._channelPatterns[i];   
            channelInfo.channelKits = this.getKitNames(i);


            channelInfo.presets = this._presets;     
            channelInfo.channelPresets = this._channelPresets[i];              


            //

            //console.log("_patterns at ins crea: ", this._patterns);
            //console.log("ch name: ", channelInfo.channelName);
            //console.log("ch ptn: ", channelInfo.channelPatterns);


            if (typeof this._channelPatterns[i] !== 'undefined') {

              channelInfo.patternId = this._channelPatterns[i][this._instrumentsConfig[i].defaultPattern].id;

              for (var k = 0; k < this._channelPatterns[i].length; k++) {
                var chptn = this._channelPatterns[i][k];  
                this._systemPatterns.push(chptn);
                //window.systemPatterns.push(chptn);
              }  

              //window.systemPatterns = this._systemPatterns;
            }
            
            //console.log('sys ptns @ ins creation: ', this._systemPatterns);




            if (typeof this._channelPresets[i] !== 'undefined') {

              channelInfo.presetId = this._channelPresets[i][this._instrumentsConfig[i].defaultPreset].id;
              channelInfo.preset = this._channelPresets[i][this._instrumentsConfig[i].defaultPreset];

              for (var k = 0; k < this._channelPresets[i].length; k++) {
                var chptn = this._channelPresets[i][k];  
                this._systemPresets.push(chptn);
              }  
            }            

            if (typeof this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentUrl; }   

            //var instrument = new mixr.models.Instrument(i, this._instrumentsConfig[i].name, tracks, 1.0, this._instrumentsConfig[i].type, this._instrumentsConfig[i].color);
            var instrument = new mixr.models.Instrument(i, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].name, tracks, 1.0, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].color, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].kitNumber, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].controls, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentName, channelInfo); 
            _instruments.push(instrument);
            //_self._instruments.push(instrument);
            //console.log('instrument:', instrument);
        };

        window.availSlots = _instruments.length;
        _availableInstruments = _instruments.concat(); // Join two arrays:
        _self._availableInstruments = _instruments.concat();
        window._availableInstruments = _instruments.concat();
        //console.log('_availableInstruments: ', _availableInstruments);

        //console.log('sys + regular ptns: ', this._systemPatterns, this._patterns);
    };

    this.createTracks = function(instrumentId, tracksConfig, type, pattern) {
        //console.log('createTracks');
        var tracks = [];
        for (var i = 0; i < tracksConfig.length; i++) {
            var config = tracksConfig[i];

            if (pattern==null) {
              var patternLine = null;
            } else {
              var patternLine = pattern[i];
              //console.log('ptn line', patternLine);
            }

            if (type === 'samples') {
                var track = new mixr.models.Track(instrumentId + '-' + i, config.name, patternLine, samplesPath + config.sampleUrl, 1.0); // null
            } else {
                var track = new mixr.models.Track(instrumentId + '-' + i, config.name, patternLine, null, 1.0); //null
                track.note = config.note;
                //console.log('track', track);
            };
            tracks.push(track);
        }

        return tracks;
    };



    this.getKitNames = function(channelNumber) {
      
        var channelKits = [];
        for (var i = 0; i < this._instrumentsConfig[channelNumber].conf.length; i++) {
            var kit = this._instrumentsConfig[channelNumber].conf[i];
            var kitName = kit.name;
            channelKits.push(kitName);
        }

        return channelKits;
    };




    this.addInstrument = function(instrument) {
        // Reset the notes of all the tracks
      /*  for (var n = 0, len = instrument.tracks.length; n < len; n += 1) {
            var track = instrument.tracks[n];
            instrument.tracks[n].resetNotes()
        } */
        _availableInstruments.push(instrument);
        _self._availableInstruments.push(instrument);
        window._availableInstruments.push(instrument);
    };


    this.addPattern = function(data, clientId) {
        //console.log('data', data);
        var pattern = JSON.parse(data.args.pattern);
        //console.log('data from addPattern fct: ', pattern);
        // if pattern.id does not already exist in _patterns Or replace/override old entry with new data (e.g: preset name changed)
        //_patterns.push(pattern);

      var pushpattern = 0;  

      if (this._patterns.length==0) {
         this._patterns.push(pattern);
      } else if (this._patterns.length>0) {
      
        for ( var j = 0, len = this._patterns.length; j < len; ++j ) {            
          var ptn = this._patterns[j];
          ptn['classs'] = 'session';

          //console.log('id compa:', ptn.id, pattern.id);

          if (ptn.id==pattern.id) {

            var ptnIndex = j;
            var pushpattern = 1;
            //console.log('session ptns',ptn);
          } /*else {
            var pushpattern = 2;
            //this._patterns.push(pattern);
          } */       
        } 


         if (pushpattern == 1) {
            this._patterns.splice(ptnIndex, 1); // remove old entry
            this._patterns.push(pattern); // update with new entry

         } else /*if (pushpattern == 2)*/ {
            this._patterns.push(pattern); // add new pattern
         }


       }




        //console.log('_patterns length: ', this._patterns.length, Object.keys(_self._patterns).length);
        //console.log('_patterns', this._patterns);

    };    



   this.addPreset = function(data, clientId) {
      //console.log('data', data);
      var preset = JSON.parse(data.args.preset);

      var pushpreset = 0;  

      if (this._presets.length==0) {
        this._presets.push(preset);
      } else if (this._presets.length>0) {
      
        for ( var j = 0, len = this._presets.length; j < len; ++j ) {            
          var pre = this._presets[j];
          pre['classs'] = 'session';

          if (pre.id==preset.id) {
            var preIndex = j;
            var pushpreset = 1;
          }       
        } 

        if (pushpreset == 1) {
          this._presets.splice(preIndex, 1); // remove old entry
          this._presets.push(preset); // update with new entry

        } else /*if (pushpreset == 2)*/ {
          this._presets.push(preset); // add new preset
        }

      }

      //console.log(this._presets);

    };    






    this.getNextInstrument = function(clientId, pwd) {

        //console.log("pwd", pwd);

        //*
        if (typeof _clients[clientId] !== 'undefined') {
            return _clients[clientId];
        } //*/

        //console.log("_availableInstruments", _availableInstruments);

        var numAvailableInstruments = _availableInstruments.length;
        if (numAvailableInstruments === 0) {
            console.log("No more instruments available");
            return;
        }

        // Do not give Conductor role/instrument unless provided pwd is mopo
        if (pwd!='mopo' && _availableInstruments[0].instrumentName=='Conductor') {
          var nextInstrument = _availableInstruments[1];
          _availableInstruments.splice(1, 1);
        } else {
          var nextInstrument = _availableInstruments[0]; // get first available instrument
          _availableInstruments.shift(); // and remove it from available instrument list
          // The shift() method removes the first item of an array, and returns that item.
          _self._availableInstruments.shift();
          window._availableInstruments.shift();          
        }



        



        if (typeof nextInstrument !== 'undefined') {

          // Initialize the instrument and call start when ready.
          nextInstrument.initialize(this.start);
          // Pass the context the instrument.
          nextInstrument.setup(_context);

          //console.log("Released next available instrument", nextInstrument);

          //console.log("_clients", _clients);

          _clients[clientId] = nextInstrument;
          //console.log("get nxt ins: ", nextInstrument);
          return nextInstrument;

        } else {
          return;
        }



        /*
        // Initialize the instrument and call start when ready.
        nextInstrument.initialize(this.start);
        // Pass the context the instrument.
        nextInstrument.setup(_context);

        //console.log("Released next available instrument", nextInstrument);

        //console.log("_clients", _clients);

        _clients[clientId] = nextInstrument;
        return nextInstrument; */
    };




    this.changeChannel = function(clientId) {
        /*
        if (typeof _clients[clientId] !== 'undefined') {
            return _clients[clientId];
        } //*/

        //console.log("_availableInstruments", _availableInstruments);

        var numAvailableInstruments = _availableInstruments.length;
        if (numAvailableInstruments === 0) {
            console.log("No more instruments available");
            return;
        }

        var nextInstrument = _availableInstruments[0]; // get first available instrument
        _availableInstruments.shift(); // and remove it from available instrument list
        // The shift() method removes the first item of an array, and returns that item.
        _self._availableInstruments.shift();
        window._availableInstruments.shift();



        if (typeof nextInstrument !== 'undefined') {

          // Initialize the instrument and call start when ready.
          nextInstrument.initialize(this.start);
          // Pass the context the instrument.
          nextInstrument.setup(_context);

          //console.log("Released next available instrument", nextInstrument);

          //console.log("_clients", _clients);

          _clients[clientId] = nextInstrument;
          return nextInstrument;

        } else {
          return;
        }


    };


    this.changeSession = function(data, clientId) {
      var sessNumber = parseInt(data.x) + 1;
      console.log("sessNumber: ", sessNumber);
      window['insConf'] = window['insConf'+sessNumber];
      this['_instrumentsConfig'] = window['insConf'];
      this._sessionNumber = sessNumber;
//this.createInstruments(); // Update general instruments' object
    };    



    this.directInfoChange = function(data) { // modify instrument object params withou reloading instruments, etc...
      var channelId = _clients[data.client].id;
      
      if (data.args.id==201) {
      _instruments[channelId].patternSeqState = data.args.ptnSeqState;
      _instruments[channelId].channelInfo.patternSeqState = data.args.ptnSeqState;
      } else {
      _instruments[channelId].channelInfo.presetId = data.args.presetId;
      }

     // console.log('dIc', data, _instruments[channelId].patternSeqState); // data.args.presetId
    }

// id: _id, x: $('#patterns').find(":selected").val(), y: 0, pattern: 1, classs: $('#patterns').find(":selected").attr('class'), kitNumber: $('#id998').find("input").val()  
// data.args, data.client
    this.updateNotes = function(data) { // update various notes
        
        var channelId = _clients[data.client].id;

        // transport patternId (unsaved or saved pattern states) across channel changes  
        _instruments[channelId].channelInfo.patternId = data.args.patternId;
        //console.log('upd notes: ', _instruments[channelId].channelInfo.patternId, data);

      if (channelId!=1) {


        //console.log('updates notes data: ', channelId); // _instruments - data, 

        //console.log('data: ', data.args.classs, data);

        if (data.args.classs=='channel') {

/*
//var tempSysPatterns = [];



//for (var i = 0; i < this._instrumentsConfig.length; i++) {

            if (typeof this._channelPatterns[channelId] !== 'undefined') {

              for (var k = 0; k < this._channelPatterns[channelId].length; k++) {
                var chptn = this._channelPatterns[channelId][k];  
                //tempSysPatterns.push(chptn);
                //console.log('channel ptn as defined in insConf: ', chptn, this._channelPatterns[channelId].length);
              }  
            }  

//};
           = oriChannelPatterns; 
          //*/
          //var ptnStorage = this._systemPatterns;
          //var ptnStorage = window.systemPatterns;

          //var ptnStorage = _self._systemPatterns; // does not seem to work neither

          var ptnStorage = JSON.parse(window.chPatternsAtStartup[channelId]); // oriChannelPatterns
          //var preStorage = JSON.parse(window.chPresetsAtStartup[channelId]);
        } else {  
          var ptnStorage = this._patterns;
          //var preStorage = this._presets; 
        }        

        var result = $.grep(ptnStorage, function(e){ return e.id == data.args.x; });
        var trackNumber = result[0].tracks.length; 
        var channelTrackLength = _instruments[channelId].tracks.length;


        if (trackNumber > channelTrackLength) {
          var trackNumber = channelTrackLength;
        } else {
          var trackNumber = trackNumber;
        }


        //console.log('sys ptns + data: ', this._systemPatterns, data, result[0], channelId);

        //console.log('ptn + sys ptns after: ', /*channelId, data.args.x, result[0], this._systemPatterns, data*/ window.chPatternsAtStartup); // , tempSysPatterns , window.systemPatterns


        // first reset played tracks of processed channel
        var maxTrackNumber = 30; // Beware Hardcoded value!
        for (var n = 0, len = maxTrackNumber; n < len; n += 1) {
          var notesNumber = 16;//result[0].tracks[n].length;
          //var traack = result[0].tracks[n];        
          var notes = [];

          for (var l = 0; l < notesNumber; l += 1) {

            if (typeof _instruments[channelId].tracks[n] !== 'undefined') {            
              _instruments[channelId].tracks[n].notes[l] = 0;//traack[l];
            }
            /*noteInfo = {};
            noteInfo.id = channelId;
            noteInfo.trackId = channelId+'-'+n;
            noteInfo.noteId = l;
            noteInfo.volume = 0; //traack[l];
            notesObject.push(noteInfo); */           
          }  
        } 














        notesObject = [];

        for (var n = 0, len = trackNumber; n < len; n += 1) {
          var notesNumber = result[0].tracks[n].length;
          var traack = result[0].tracks[n];
          //console.log("notesNumber + traack", notesNumber, traack);          

          var notes = [];

          for (var l = 0; l < notesNumber; l += 1) {
            //notes[l] = traack[l];
            _instruments[channelId].tracks[n].notes[l] = traack[l];
            //console.log("track, note, volume: ", n, l, traack[l]);

            noteInfo = {};
            noteInfo.id = channelId;
            noteInfo.trackId = channelId+'-'+n;
            noteInfo.noteId = l;
            noteInfo.volume = traack[l];
            //window['SEQVIEW'].updateNote(noteInfo);
            //if noteInfo.volume>0 {
            notesObject.push(noteInfo);            
            //}

          }  
          //var notes = result[0].tracks[n].getNotes(); // 
          //anextInstrument.tracks[n].setNotes(notes);
        } 
        //console.log("notesObject: ", notesObject);
        return notesObject;


    } // end of exlude conductor channel (channel 1 aka 2nd channel)    

        //var trackId = data.trackId.split('-')[1];
        //var instrumentId = data.trackId.split('-')[0];
        //_instruments[data.client].tracks[trackId].notes[data.noteId] = data.volume; 
    };




    this.updateInstrument = function(data, clientId) { // change(Instrument)Kit

        //if (typeof data.pattern !== 'undefined') { = do not transform old instrument to new one...

        //console.log('_clients after:', _clients);
        var trackSet = data.x; // destination kit number (0 | 1) go from instrument 0 to [1] - kitNumber // valueX-109
        var prevKit = _clients[clientId].id; // source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

        //console.log("_clients[clientId].id", _clients[clientId].id);
        console.log("dat ptn + data ptnId: ", data.pattern, data.patternId, data.x);

        if (data.id==998) {
          var patternId = data.patternId;
        } else {
          var patternId = data.x;
        }  


        if (typeof data.pattern !== 'undefined') { // if "change pattern only" msg received
          var trackSet = data.kitNumber; //prevKit;


          //var allPatterns = this._systemPatterns.concat(this._patterns);
          //console.log('ptn sys storage: ', this._systemPatterns, this._patterns, data.classs);

          if (data.classs=='channel') {
            var ptnStorage = this._systemPatterns;
          } else {  
            var ptnStorage = this._patterns;
          }

          //var tracksUpdate = this.createTracks(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].tracks, this._instrumentsConfig[prevKit].conf[trackSet].type);
          var result = $.grep(ptnStorage, function(e){ return e.id == data.x; });
          //console.log("matchin ptn object", result[0]);   // .tracks          

        } //else {

        // retrieve track info from destination kit and override source kit with that info
        var tracksUpdate = this.createTracks(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].tracks, this._instrumentsConfig[prevKit].conf[trackSet].type); 

        //}



        //var channelInfo = this._channelInfo;
        //channelInfo['barOffset']= this._insBarOffset[0]; // prevKit
        channelInfo = {};
        channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
        channelInfo.serverStartTime = this._audioServerStartTimestamp;
        channelInfo.kickoutTime = this._insKickoutTime;
        channelInfo.barOffset = eval('this._insBarOffset'+prevKit); //this._insBarOffset[0];  
        channelInfo.countdownMode = this._countdownMode;  
        //channelInfo.channelName = this._channelName[prevKit];  


        //channelInfo.sessionName = this._sessionList[this._sessionNumber];
        channelInfo.sessionName = _self._sessionNumber-1; //this._sessionList[;
        //console.log('session name update ins: ', channelInfo.sessionName);
        channelInfo.sessionList = this._sessionList;//Serialized;


        if (typeof prevKit !== 'undefined') {   
          //console.log('prevKit', prevKit);
          channelInfo.channelNumber = prevKit;
          channelInfo.channelName = this._channelName[prevKit]['name'];
          channelInfo.channelColor = this._channelName[prevKit]['color'];            
        }


        /*if (typeof this._channelpatternSeq[prevKit] !== 'undefined') {                 
          channelInfo.channelPatternSeq = this._channelpatternSeq[prevKit][this._instrumentsConfig[prevKit].defaultPatternSeq];               
        }


        if (typeof _instruments[prevKit].patternSeqState !== 'undefined') {  
          channelInfo.patternSeqState = _instruments[prevKit].patternSeqState;
         } */
        

        //channelInfo.sessionNumber = ;        

        channelInfo.patterns = this._patterns;
        channelInfo.channelPatterns = this._channelPatterns[prevKit];
        channelInfo.channelKits = this.getKitNames(prevKit);

        if (typeof data.kitNumber !== 'undefined') { channelInfo.presetId = data.kitNumber; }

        if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') { channelInfo.patternId = result[0].id; /*data.x*/ var patternRoot = result[0]; } else if (typeof data.patternId !== 'undefined') { channelInfo.patternId = data.patternId; var patternRoot = data.patternId; }
        //console.log("_patterns at kit change: ", this._patterns);

        channelInfo.presets = this._presets;     
        channelInfo.channelPresets = this._channelPresets[prevKit];  
        if (typeof data.presetId !== 'undefined') { channelInfo.presetId = data.presetId; }   


        if (typeof this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl; }   
             


        if (typeof data.ptnSeq !== 'undefined') {
          console.log('data.ptnSeq: ', data.ptnSeq);

          var ptnSeqObjFromStr = JSON.parse(data.ptnSeq);
          //channelInfo.ptnSeq = data.ptnSeq;
          //channelInfo.channelPatternSeq = [];            
          channelInfo.channelPatternSeqList = ptnSeqObjFromStr.list;
          //this._patternSequencer[prevKit] = channelInfo.channelPatternSeqList;

          channelInfo.patternSeqState = ptnSeqObjFromStr.state;
        }


        //console.log('insUrl:', this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl);  // preset id b4 inst change data.presetId

        // override source instrument with destination kit info
        var anextInstrument = new mixr.models.Instrument(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].name, tracksUpdate, 1.0, this._instrumentsConfig[prevKit].conf[trackSet].type, this._instrumentsConfig[prevKit].conf[trackSet].color, this._instrumentsConfig[prevKit].conf[trackSet].kitNumber, this._instrumentsConfig[prevKit].conf[trackSet].controls, this._instrumentsConfig[prevKit].conf[trackSet].instrumentName, channelInfo);
    
        if (anextInstrument.tracks.length > _clients[clientId].tracks.length) {
          var trackNumber = _clients[clientId].tracks.length;
        } else {
          var trackNumber = anextInstrument.tracks.length;
        }

        
        if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') {
        //var pattern = JSON.parse(data.args.pattern);

        //console.log('ptn root: ', patternRoot);

        var trackNumber = patternRoot.tracks.length; // result[0]
        for (var n = 0, len = trackNumber; n < len; n += 1) {
          var notesNumber = patternRoot.tracks[n].length;
          var traack = patternRoot.tracks[n];
          //console.log("notesNumber + traack", notesNumber, traack);

          var notes = [];

          for (var l = 0; l < notesNumber; l += 1) {
            notes[l] = traack[l];
          }  
          //var notes = result[0].tracks[n].getNotes(); // 
          anextInstrument.tracks[n].setNotes(notes);
        }          

      } else {

        // use source instrument kit as pattern to feed destination kit with note info
        for (var n = 0, len = trackNumber; n < len; n += 1) {
          //var track = _instruments[0].tracks[n];
          var notes = _clients[clientId].tracks[n].getNotes(); // 
          anextInstrument.tracks[n].setNotes(notes);
        }

      }  

        _instruments[prevKit] = anextInstrument;
        //this._instruments[prevKit] = anextInstrument;

        //console.log('kit number', anextInstrument.kitNumber, this._instruments[prevKit].kitNumber);

        // Initialize the instrument and call start when ready.
        anextInstrument.initialize(this.start);
        // Pass the context the instrument.
        anextInstrument.setup(_context);
        //console.log("Updated instrument", anextInstrument);

        _clients[clientId] = anextInstrument;
        //console.log("_clients", _clients);

        console.log("this._patterns: ", this._patterns);

        return anextInstrument;
    };    











    this.updatePreset = function(data, clientId) { // changePreset

        var trackSet = data.kitNumber; // destination kit number (0 | 1) go from instrument 0 to [1] - kitNumber // valueX-109
        var prevKit = _clients[clientId].id; // probably channelId - source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

        console.log("prevKit: ", data.patternId/* prevKit, trackSet, this._instrumentsConfig[prevKit].conf[trackSet].tracks*/);

        /*if (data.id==998) {
          var patternId = data.patternId;
        } else {
          var patternId = data.x;
        }  */

        if (typeof data.pattern !== 'undefined') { // if "change pattern only" msg received
          var trackSet = data.kitNumber; //prevKit;

          if (data.classs=='channel') {
            var ptnStorage = this._systemPatterns;
          } else {  
            var ptnStorage = this._patterns;
          }
          
          var result = $.grep(ptnStorage, function(e){ return e.id == data.patternId; }); // data.x
          //console.log("matchin ptn object", result[0]);   // .tracks          

        } 

        // retrieve track info from destination kit and override source kit with that info
        var tracksUpdate = this.createTracks(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].tracks, this._instrumentsConfig[prevKit].conf[trackSet].type); 

        channelInfo = {};
        channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
        channelInfo.serverStartTime = this._audioServerStartTimestamp;
        channelInfo.kickoutTime = this._insKickoutTime;
        channelInfo.barOffset = eval('this._insBarOffset'+prevKit); //this._insBarOffset[0];  
        channelInfo.countdownMode = this._countdownMode;  
        channelInfo.sessionName = _self._sessionNumber-1; 
        channelInfo.sessionList = this._sessionList;//Serialized;

        if (typeof prevKit !== 'undefined') {   
          //console.log('prevKit', prevKit);
          channelInfo.channelNumber = prevKit;
          channelInfo.channelName = this._channelName[prevKit]['name'];
          channelInfo.channelColor = this._channelName[prevKit]['color'];            
        }

        if (typeof this._channelpatternSeq[prevKit] !== 'undefined') {                 
          channelInfo.channelPatternSeq = this._channelpatternSeq[prevKit][this._instrumentsConfig[prevKit].defaultPatternSeq];               
        }

        channelInfo.patterns = this._patterns;
        channelInfo.channelPatterns = this._channelPatterns[prevKit];
        channelInfo.channelKits = this.getKitNames(prevKit);

        if (typeof data.presetId !== 'undefined') { channelInfo.presetId = data.presetId; }

        if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') { channelInfo.patternId = result[0].id; /*data.x*/ var patternRoot = result[0]; } else if (typeof data.patternId !== 'undefined') { channelInfo.patternId = data.patternId; var patternRoot = data.patternId; }
        
        if (typeof data.patternId !== 'undefined') { channelInfo.patternId = data.patternId; }

        if (typeof this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl; }   

        channelInfo.presets = this._presets;     
        channelInfo.channelPresets = this._channelPresets[prevKit];     



        if (typeof _instruments[prevKit].patternSeqState !== 'undefined') {  
          channelInfo.patternSeqState = _instruments[prevKit].patternSeqState;
         }         

         //console.log('ins obj: ', _instruments[prevKit], channelInfo.patternSeqState);

       /* if (typeof this._channelPresets[prevKit] !== 'undefined') {

          //channelInfo.presetId = this._channelPresets[i][this._instrumentsConfig[i].defaultPreset].id;
          //channelInfo.preset = this._channelPresets[i][this._instrumentsConfig[i].defaultPreset];

        }  */  

        console.log('data.ptnSeq: ', data.ptnSeq);

        if (typeof data.ptnSeq !== 'undefined') {
          

          var ptnSeqObjFromStr = JSON.parse(data.ptnSeq);      
          channelInfo.channelPatternSeqList = ptnSeqObjFromStr.list;
          //this._patternSequencer[prevKit] = channelInfo.channelPatternSeqList;
          //channelInfo.patternSeqState = ptnSeqObjFromStr.state;
        }


        // override source instrument with destination kit info
        var anextInstrument = new mixr.models.Instrument(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].name, tracksUpdate, 1.0, this._instrumentsConfig[prevKit].conf[trackSet].type, this._instrumentsConfig[prevKit].conf[trackSet].color, this._instrumentsConfig[prevKit].conf[trackSet].kitNumber, this._instrumentsConfig[prevKit].conf[trackSet].controls, this._instrumentsConfig[prevKit].conf[trackSet].instrumentName, channelInfo);
    
        if (anextInstrument.tracks.length > _clients[clientId].tracks.length) {
          var trackNumber = _clients[clientId].tracks.length;
        } else {
          var trackNumber = anextInstrument.tracks.length;
        }
        
        if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') {
        //var pattern = JSON.parse(data.args.pattern);

          var trackNumber = patternRoot.tracks.length; // result[0]
          for (var n = 0, len = trackNumber; n < len; n += 1) {
            var notesNumber = patternRoot.tracks[n].length;
            var traack = patternRoot.tracks[n];

            var notes = [];

            for (var l = 0; l < notesNumber; l += 1) {
              notes[l] = traack[l];
            }  
            anextInstrument.tracks[n].setNotes(notes);
          }          

        } else {

          // use source instrument kit as pattern to feed destination kit with note info
          for (var n = 0, len = trackNumber; n < len; n += 1) {
            var notes = _clients[clientId].tracks[n].getNotes(); // 
            anextInstrument.tracks[n].setNotes(notes);
          }

        }  

        _instruments[prevKit] = anextInstrument;

        // Initialize the instrument and call start when ready.
        anextInstrument.initialize(this.start);
        // Pass the context the instrument.
        anextInstrument.setup(_context);        
        _clients[clientId] = anextInstrument;

        return anextInstrument;
    };    








    this.updateChannelInfo = function(clientId, order) { 

      console.log('clientId + order: ',clientId, order);


  if (typeof _clients[clientId] !== 'undefined') {

      var channelNumber = _clients[clientId].id; // ! channelNumber ! source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

      if (channelNumber!=1) { // do not process conductor role which has no track data associated to it! Beware hardcoded value!

        //console.log('kitNumber', this._instruments[channelNumber].kitNumber);

        var kitNumber = _instruments[channelNumber].kitNumber;

        
        //console.log('upd ch clt id + tracks ',channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber])

        // retrieve track info from destination kit and override source kit with that info
        var tracksUpdate = this.createTracks(channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].tracks, this._instrumentsConfig[channelNumber].conf[kitNumber].type); 

        channelInfo = {};
        channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
        channelInfo.serverStartTime = this._audioServerStartTimestamp;
        channelInfo.kickoutTime = this._insKickoutTime;
        channelInfo.barOffset = eval('this._insBarOffset'+channelNumber); //this._insBarOffset[0];  
        channelInfo.countdownMode = this._countdownMode;  
        channelInfo.channelName = this._channelName[channelNumber]['name']; 
        channelInfo.channelNumber = channelNumber;
        channelInfo.channelColor = this._channelName[channelNumber]['color'];
        channelInfo.sessionName = _self._sessionNumber-1; //this._sessionList[;
        channelInfo.sessionList = this._sessionList;//Serialized;


        if (typeof this._channelpatternSeq[channelNumber] !== 'undefined') {                 
          channelInfo.channelPatternSeq = this._channelpatternSeq[channelNumber][this._instrumentsConfig[channelNumber].defaultPatternSeq]; // i              
        }

        if (typeof _instruments[channelNumber].patternSeqState !== 'undefined') {  
          channelInfo.patternSeqState = _instruments[channelNumber].patternSeqState; // i
         } 

        channelInfo.patterns = this._patterns;   

        channelInfo.channelPatterns = this._channelPatterns[channelNumber];
        channelInfo.channelKits = this.getKitNames(channelNumber);

        if (typeof this._instrumentsConfig[channelNumber].conf[kitNumber].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[channelNumber].conf[kitNumber].instrumentUrl; }   

        //console.log('start time', this._audioServerStartTimestamp);

        // override source instrument with destination kit info
        var anextInstrument = new mixr.models.Instrument(channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].name, tracksUpdate, 1.0, this._instrumentsConfig[channelNumber].conf[kitNumber].type, this._instrumentsConfig[channelNumber].conf[kitNumber].color, /*this._instrumentsConfig[channelNumber].conf[kitNumber].kitNumber*/ kitNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].controls, this._instrumentsConfig[channelNumber].conf[kitNumber].instrumentName, channelInfo);
    
        if (anextInstrument.tracks.length > _clients[clientId].tracks.length) {
          var trackNumber = _clients[clientId].tracks.length;
        } else {
          var trackNumber = anextInstrument.tracks.length;
        }

        // use source instrument kit as pattern to feed destination kit with note info
        for (var n = 0, len = trackNumber; n < len; n += 1) {
          //var track = _instruments[0].tracks[n];
          var notes = _clients[clientId].tracks[n].getNotes(); // 
          anextInstrument.tracks[n].setNotes(notes);
        }

        _instruments[channelNumber] = anextInstrument;
        //_self._instruments[channelNumber] = anextInstrument;

        // Initialize the instrument and call start when ready.
        anextInstrument.initialize(this.start);
        // Pass the context the instrument.
        anextInstrument.setup(_context);

        _clients[clientId] = anextInstrument;

        return anextInstrument;
      }  

} // end of if (typeof _clients[clientId] !== 'undefined')


    };


this.updateChannelSound = function(clientId, value, opeId) {

  if (typeof _clients[clientId]!== 'undefined') {

  var channelNumber = _clients[clientId].id;
  //this._instruments[channelNumber].channelInfo.soundMode = value;
  //this['_instrumentsSoundModes['+channelNumber+']']=value;
  if (opeId==0) {
    this._instrumentsSoundModes[channelNumber]=value;
  } else if (opeId==1){
    this._audioChannelShift[channelNumber]=value;





/*
        var currentTime = _context.currentTime;

        // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
        currentTime -= this._startTime;*/

    console.log('_self._noteTimes[channelNumber]', _self._noteTimes[channelNumber], channelNumber);







            if (_self._tempo<60) {
              var bpm = 60;
            } else {
              var bpm = _self._tempo;
            }
            var secondsPerBeat = 60.0 / bpm;
            var secondsPerStep = secondsPerBeat/4; // per 32th note    
            var secondsPerUnit = secondsPerStep/16; // 32 // 256




            /*if (typeof _self._audioChannelShift[0] !== 'undefined') {
              if (_self._audioChannelShift[0]>0) {
                _self._noteTime = _self._noteTime + (secondsPerUnit*_self._audioChannelShift[0]);
              } else if (_self._audioChannelShift[0]<0) {
                _self._noteTime = _self._noteTime - (secondsPerUnit*_self._audioChannelShift[0]);
              } else {
                _self._noteTime = _self._noteTime;
              }
             } */



            if (typeof _self._audioChannelShift[channelNumber] !== 'undefined') {
              if (_self._audioChannelShift[channelNumber]>0) {
                _self._noteTimes[channelNumber] = _self._noteTimes[0] + (secondsPerUnit*_self._audioChannelShift[channelNumber]); // _self._noteTimes[channelNumber]
              } else if (_self._audioChannelShift[channelNumber]<0) {
                _self._noteTimes[channelNumber] = _self._noteTimes[0] - (secondsPerUnit*_self._audioChannelShift[channelNumber]);
              } else {
                _self._noteTimes[channelNumber] = _self._noteTimes[0]; // _self._noteTime - 1st sounding channels as time master
                console.log('ch1 as time master: ', _self._noteTimes[0], _self._noteTimes[2]);
              }
             } 





  }
  //console.log('updateChannelSound: ', clientId, channelNumber, value/*, _self['_instrumentsSoundModes[0]'], _self['_instrumentsSoundModes[1]'], _self['_instrumentsSoundModes[2]']*/);
  //this[paramX] = valueX;
  //console.log("channel soundMode: ", channelNumber, _self._instruments[channelNumber].channelInfo.soundMode /*_instruments, _instruments[channelNumber].channelInfo.soundMode*/);


  } // end of undefined check

}; // end of func









    this.getRandomInstrument = function(clientId) {
        // if clientId already known from system don't change instrument
        /*if (typeof _clients[clientId] !== 'undefined') {
            return _clients[clientId];
        } */

        var numAvailableInstruments = _availableInstruments.length;
        if (numAvailableInstruments === 0) {
            console.log("No instruments available");
            return;
        }

        var randomIndex = Math.floor(Math.random() * numAvailableInstruments);
        var randomInstrument = _availableInstruments[randomIndex];
        _availableInstruments.splice(randomIndex, 1);

        // Initialize the instrument and call start when ready.
        randomInstrument.initialize(this.start);
        // Pass the context the instrument.
        randomInstrument.setup(_context);

        //console.log("Released random instrument", randomInstrument);

        _clients[clientId] = randomInstrument;
        return randomInstrument;
    };

    this.start = function() {
        //console.log('Started!', this);
        if (_started) return;
        _started = true;
        _noteTime = 0.0;
        this._noteTime = 0.0;
    _timeGrid = 0.0;


    for (var i = 0; i < _instruments.length; i++) {
      _self._noteTimes.push(0.0);
      _self._noteChannelIndex.push(0);
      _self._noteTriggers.push(0);      
    }  


        // _startTime = _context.currentTime + 0.160;
        _startTime = _context.currentTime;// + 0.005;
        this._startTime = _context.currentTime;
        _self.schedule();
    };

    this.schedule = function() {
        var currentTime = _context.currentTime;

        // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
        currentTime -= _self._startTime;

        //console.log('cur + start times:', currentTime, _startTime);

            if (_self._tempo<60) {
              var bpm = 60;
            } else {
              var bpm = _self._tempo;
            }
            var secondsPerBeat = 60.0 / bpm;
            //var secondsPerStep = secondsPerBeat/1; // per 32th note    
            //var secondsPerUnit = secondsPerStep/12.5;


            /*if (typeof _self._audioChannelShift[0] !== 'undefined') {
              if (_self._audioChannelShift[0]>0) {
                _noteTime = _noteTime + (secondsPerUnit*_self._audioChannelShift[0]);
              } else if (_self._audioChannelShift[0]<0) {
                _noteTime = _noteTime - (secondsPerUnit*_self._audioChannelShift[0]);
              } else {
                _noteTime = _noteTime;
              }
             } */




    //while (_timeGrid < currentTime + 0.200) {

      //console.log('_timeGrid: ', _timeGrid);
/*
        while (_self._noteTime < currentTime + 0.200) { // _noteTime = reference step trigger time

            
            //contextPlayTime = _noteTime + _startTime;
            //if (_self._tempo<60) {
            //  var bpm = 60;
            //} else {
            //  var bpm = _self._tempo;
            //}
            //secondsPerBeat = 60.0 / bpm; // aka quarter note or 1/4 bar  
            //secondsPerStep = secondsPerBeat/1; // per 32th note    
            //secondsPerUnit = secondsPerStep/12.5; // 50 - 25
            //contextPlayTimeSamples = contextPlayTime - secondsPerBeat; 

            _self.step();
            //_self._noteTrigger = 0;
        }
//*/

            //*
        //while (_noteTime < currentTime + 0.200) { // défilé des crans // step change...

            // Convert noteTime to context time.
//            var contextPlayTime = _self._noteTime + _self._startTime;

            //console.log('contextPlayTime', _noteIndex); // contextPlayTime

            /*
            // adjust sample "click" to happen in sync with beat seq animation by advancing trigger time by 1 beat (16th bar) 
            if (_self._tempo<60) {
              var bpm = 60;
            } else {
              var bpm = _self._tempo;
            }
            var secondsPerBeat = 60.0 / bpm; // aka quarter note or 1/4 bar  
            var secondsPerStep = secondsPerBeat/1; // per 32th note    
            var secondsPerUnit = secondsPerStep/12.5; // 50 - 25
            */



//            var contextPlayTimeSamples = contextPlayTime - secondsPerBeat;    // 2*(secondsPerBeat/16)
            //console.log('bpm', bpm);        
            //*/

            for (var i = 0; i < _instruments.length; i++) { // we might to replace _instruments with _self._instruments to make it more dynamic?



        while (_self._noteTimes[i] < currentTime + 0.200) { // _noteTime = reference step trigger time

            _self.stepPerChannel(i); // _self._noteTimes[i]
            //_self._noteTrigger = 0;
            _self._noteTriggers[i] = [];// 0;
            for (var j = 0; j < _instruments[i].tracks.length; j++) {
                    _self._noteTriggers[i].push(j);
                    _self._noteTriggers[i][j]=0;
            }  
        }







                //console.log('cg snd mode: ', i, _instruments[i], _instruments[i].channelInfo.soundMode); // _self._Ins01Volume

                /*var incr = i+1;
                //var insVolume = '_self_Ins0'+incr+'Volume'; // this will cause problem after 9 instruments aka 010 use '01 - 16' step technique

                if (typeof window['_self_Ins0'+incr+'Volume'] !== 'undefined') { // // this._Ins01Volume
                    console.log('insxx volume: ', window['_self_Ins0'+incr+'Volume']);
                    _instruments[i].setParams(window['_self_Ins0'+incr+'Volume']);
                } */
                //this['_instrumentsSoundModes['+channelNumber+']']
                //console.log(_self['_instrumentsSoundModes['+i+']']);
                //console.log(_self['_instrumentsSoundModes[0]'], _self['_instrumentsSoundModes[1]'], _self['_instrumentsSoundModes[2]']);

                //console.log('first 3 ch sMode: ', _self._instrumentsSoundModes[0], _self._instrumentsSoundModes[1], _self._instrumentsSoundModes[2], _self._instrumentsSoundModes[3], _self._instrumentsSoundModes[4], _self._instrumentsSoundModes[5]);
                // _instruments[i].channelInfo.soundMode

              if (typeof _self._instrumentsSoundModes[i] == 'undefined' /*|| this._instrumentsSoundModes[i] ==1*/) {
                  //if (this._instrumentsSoundModes[i] == 1) {
                    var play = 1;
                //}
              } else if (typeof _self._instrumentsSoundModes[i] !== 'undefined' && _self._instrumentsSoundModes[i] ==1){
                var play = 1;
              } else /*if (typeof _self._instrumentsSoundModes[i] !== 'undefined' && _self._instrumentsSoundModes[i] ==0)*/ {
                var play = 0;
              }
                



              






                for (var j = 0; j < _instruments[i].tracks.length; j++) {
                    var track = _instruments[i].tracks[j];

                    //console.log('track.id', track.id);
                    /*_self._noteTriggers[i] = [];
                    _self._noteTriggers[i].push(j);
                    _self._noteTriggers[i][j]=0; */

                        // note off on synth when note is even 0-2.14
                        if(_noteIndex & 1)
                        { 
                          var stopStep = 0;
                        } else {
                          var stopStep = 1;
                        }

                    //var volume = track.notes[_self._noteChannelIndex[0]]; // _noteIndex


                    if (_instruments[i].type === 'samples' && _instruments[i].isLoaded()) {
                      var volume = track.notes[_self._noteChannelIndex[0]]; // use first sounding-sample channel as clock master
                        if (volume > 0 && play==1) {

            /*if (typeof _self._audioChannelShift[i] !== 'undefined') {
              if (_self._audioChannelShift[i]>0) {
                var contextPlayTimeSamples = contextPlayTimeSamples + (secondsPerUnit*_self._audioChannelShift[i]);
                //console.log('_self._audioChannelShift[i]', i, _self._audioChannelShift[i], contextPlayTimeSamples);
              } else if (_self._audioChannelShift[i]<0) {
                var contextPlayTimeSamples = contextPlayTimeSamples - (secondsPerUnit*_self._audioChannelShift[i]);
                //console.log('_self._audioChannelShift[i]', i, _self._audioChannelShift[i], contextPlayTimeSamples);
              } else {
                var contextPlayTimeSamples = contextPlayTimeSamples;
                //console.log('_self._audioChannelShift[i]', i, _self._audioChannelShift[i], contextPlayTimeSamples);
              }
             } */

                            
                            //console.log('adjusted', contextPlayTime + (secondsPerBeat/16));
                            //var timeDiff=contextPlayTimeSamples-currentTime;

var contextPlayTime = _self._noteTimes[i] + _self._startTime;
var contextPlayTimeSamples = contextPlayTime - secondsPerBeat;


                            if (_self._noteTriggers[i][j]==0) {

                            //if (contextPlayTimeSamples ) { // < currentTime+2
                              _self.playNote(track, contextPlayTimeSamples, volume); // , i - contextPlayTime
                              //console.log('track: ', _self._noteTriggers[i] /*track/*, _noteTime, contextPlayTimeSamples, currentTime*/);
                            //}
                            }
                            _self._noteTriggers[i][j]++;

                        }
                    } else if (_instruments[i].type === 'synth') {

                      var volume = track.notes[_self._noteChannelIndex[i]]; //i
/*

            if (typeof _self._audioChannelShift[i] !== 'undefined') {
              if (_self._audioChannelShift[i]>0) {
                var contextPlayTimeSamples = contextPlayTime + (secondsPerUnit*_self._audioChannelShift[i]);
              } else if (_self._audioChannelShift[i]<0) {
                var contextPlayTimeSamples = contextPlayTime - (secondsPerUnit*_self._audioChannelShift[i]);
              } else {
                var contextPlayTimeSamples = contextPlayTime;
              }
             } */



//currentTime

                        if (volume==1 && play==1 /*&& contextPlayTimeSamples < currentTime + 1.200*/) { // we 're sure that instrument is loaded 'cause it has some notes associated to it - volume > 0
                /*          
                if (i==1) { // only check if instrument loaded
                  _instruments[1].setParams(2,_self._Ins01Volume); // send array of param ids => values INSTEAD
                } */








                      //console.log('contextPlayTime: ', _instruments[i], contextPlayTimeSamples, currentTime);


                          //if (_timeGrid >=contextPlayTimeSamples + 0.2) {

                            //_instruments[i].setParams(_self._tempo);
                            _instruments[i].play(track.note); // track.note - track.name for mr synth
                            /*if (track.id[0]==2) {
                              console.log('track', track, _instruments[i], _noteIndex);
                            } */

                         // }  

                        } else if (volume ==0 && play==1) /*if (stopStep==1 && volume ==0)*/ {
                            _instruments[i].stop(track.note); // track.name
                            /*if (track.id[0]==2) {
                              console.log('track', track, _noteIndex);
                            } */
                        }
                    }
                }

              //}

            }

            // Attempt to synchronize drawing time with sound
            if (_noteTime != _lastDrawTime) {
                _lastDrawTime = _noteTime;
                _self.emit(mixr.enums.Events.SEQUENCER_BEAT, _noteIndex); // lighten data transmitted to clients
            }

         //   _self.step();
       // }



    //_self.timeGrid();

    //}




        requestAnimationFrame(_self.schedule);
    };

    this.playNote = function(track, noteTime, volume) { /*, channelId*/
        // Create the note
        var voice = _context.createBufferSource();
        voice.buffer = track.getBuffer();

        // Create a gain node.
        var gainNode = _context.createGain();
        // Connect the source to the gain node.
        voice.connect(gainNode);

        //console.log('voice: ', voice);
        voice.playbackRate.value = this._playbackRate;


              // create volume node so that volume can be set per track as opposed to per note velocity
              var volumeNode = _context.createGain();

              // Connect the gain (sample playback via voice > gain > volume) to volume node.
              gainNode.connect(volumeNode);

              // set per track volume
              //volumeNode.gain.value = this._Ins01Volume; // 0.1 use track.id[0], first char of "0-1" to route volume data to right instrument

              var channelId = track.id.charAt(0);


              if (typeof window['SEQ']['_insVol'+channelId] !== 'undefined') {
                volumeNode.gain.value = window['SEQ']['_insVol'+channelId];

              } else {
                volumeNode.gain.value = eval('this._insVol'+channelId); // _insVol0
              }  
              


        // Connect the volume node to the destination. // gain
        volumeNode.connect(_masterGainNode); // gainNode


        // Reduce the volume.
        gainNode.gain.value = volume;

        // voice.connect(_context.destination);
        voice.start(noteTime);
        //console.log('noteTime: ', noteTime);
    };

    this.step = function() {

        // force minimum bpm to 60 so that app does not bug
        if (this._tempo<60) {
          var bpm = 60;
        } else {
          var bpm = this._tempo;
        }

        // Advance time by a 16th note...
        var secondsPerBeat = 60.0 / bpm; // _tempo - this._tempo
        _noteTime += 0.25 * secondsPerBeat;
        this._noteTime += 0.25 * secondsPerBeat;








        // 0.03125 = 1/32 = 128th note
        _noteIndex++;

        if (_noteIndex == _loopLength) {
            _noteIndex = 0;
            // pattern++;
        }
    };



    this.stepPerChannel = function(channelNumber) { // /*, channelNoteTime*/

        if (this._tempo<60) {
          var bpm = 60;
        } else {
          var bpm = this._tempo;
        }

        // Advance time by a 16th note...
        var secondsPerBeat = 60.0 / bpm; 
        this._noteTimes[channelNumber] += 0.25 * secondsPerBeat;
        this._noteChannelIndex[channelNumber]++;

        if (this._noteChannelIndex[channelNumber] == _loopLength) {
            this._noteChannelIndex[channelNumber] = 0;
        }


        if (channelNumber==0) {
          if (this._noteTimes[channelNumber] != _lastDrawTime) {
              _lastDrawTime = this._noteTimes[channelNumber];
              _self.emit(mixr.enums.Events.SEQUENCER_BEAT, this._noteChannelIndex[channelNumber]); // lighten data transmitted to clients
          }
        }



    };






    this.timeGrid = function() {

        // force minimum bpm to 60 so that app does not bug
        if (this._tempo<60) {
          var bpm = 60;
        } else {
          var bpm = this._tempo;
        }

        // Advance time by a 128th note...
        var secondsPerBeat = 60.0 / bpm; // _tempo - this._tempo
        _timeGrid += 0.25 * secondsPerBeat; // 0.03125 = 1/32 = 128th note | 0.25 = 16th note
        
        /*_noteIndex++;

        if (_noteIndex == _loopLength) {
            _noteIndex = 0;
            // pattern++;
        }*/
    };    

    this.updateNote = function(data) {
        //console.log('update note', data);
        //console.log('_clients: ', data.client); // _clients

        var trackId = data.trackId.split('-')[1];
        var instrumentId = data.trackId.split('-')[0];
        // TODO check the values MTF

        console.log('data.id etc: ', data, data.id, _instruments[data.id]);
        _instruments[data.id].channelInfo.patternId = data.patternId;
        _instruments[data.id].tracks[trackId].notes[data.noteId] = data.volume; // data.id 0
        //_self._instruments[data.id].tracks[trackId].notes[data.noteId] = data.volume;
        //_instruments[instrumentId].tracks[trackId].notes[data.noteId] = data.volume;

    };






    this.updateFxParam = function(data, clientId) { // updateParam
        
        //console.log('clt id:', _clients[clientId].instrumentName);

        // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object
        var synthInstance2 = _clients[clientId].instrumentName + '_' + _clients[clientId].id;        
        var synthInstance1 = window[synthInstance2];

        //console.log(synthInstance2+' obj before change: ', window[synthInstance2]['controls']);

        if (typeof synthInstance1 !== 'undefined') {

          var controls = window[synthInstance2]['controls']; 
          //var input = 1;

          // if client channel has a controls (knobs) object
          if (_clients[clientId].controls!=0) {    

            for (var j = 0; j < controls.length; j++) {

              if (controls[j].id==data.id) {

                // Prevent aike synth from muting when user sends empty/void value or enters non numeric values
                //var valueX = data.x;
                var valueXDigitTest = /^\d+$/.test(data.x);

                if (data.x=='' || valueXDigitTest==false) {
                  var rawValueX = 0;
                  //var data.x = 0;
                } else {
                  var rawValueX = data.x;
                }
                
                //console.log('valueX is digit test', valueXDigitTest);                

                if (/*controls[j].x.interpolate &&*/ controls[j].x.interpolate==0) {
                  var valueX = rawValueX; //valueX; // data.x;
                } else {
                  //valueX = this.interpolate(data.x, controls[j].x.min, controls[j].x.max);  
                  var valueX = this.interpolate2(rawValueX, controls[j].x.min, controls[j].x.max, controls[j].x.displayedRangeMin, controls[j].x.displayedRangeMax);  
                  console.log('valueX', valueX); // data.x  
                }
              
                if (controls[j].y) {
                  valueY = this.interpolate(data.y, controls[j].y.min, controls[j].y.max);
                }



                // send value to synthInstance object // channel
                //console.log('ctrl block');
                window[synthInstance2]['controls'][j].x.value = rawValueX; // data.x: get "raw" data aka participant displayed value
                //console.log('val stored into obj '+synthInstance2, window[synthInstance2]['controls'][j].x.value);
                //console.log('update', _clients[clientId].instrumentName, controls[j].x.param);

                if (controls[j].x.param!='[external]') {
                  switch (_clients[clientId].instrumentName) {
                    case 'AikeWebsynth1':
                      // value sent as parameter to synth instance object
                      eval(synthInstance2+'.'+controls[j].x.param+'('+valueX+')'); // data.x
                      break;
                    case 'MrSynth':
                      eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                      break;
                    case 'Conductor':
                  }    

                    // keep ids that correspond to channel volumes
                    if (data.id<=900 && data.id>800) {   // data.id>800
                      //var channelNumber = data.id;
                      var channelNumber = controls[j].x.param.charAt(7);
                      //console.log('insName', _instruments[channelNumber].instrumentName);


                      // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object
                      var synthInstance2 = _instruments[channelNumber].instrumentName + '_' + channelNumber;  
                      //var synthInstance2 = _self._instruments[channelNumber].instrumentName + '_' + channelNumber;      

                      var synthInstance1 = window[synthInstance2];                      

                      //if (controls[j].x.param!='[external]') {
                        if (typeof synthInstance1 !== 'undefined') {
                          switch (_instruments[channelNumber].instrumentName) { // _instruments
                            case 'AikeWebsynth1':
                              // value sent as parameter to synth instance object
                              eval(synthInstance2+'.'+controls[j].x.subParams.AikeWebsynth1+'('+valueX+')'); // data.x
                              break;
                            case 'MrSynth':
                              eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                              break;
                            case 'Sampler':
                              this[controls[j].x.param] = valueX;
                              break; 
                          }
                        } /*else { // case 'Sampler'
                          this[controls[j].x.param] = valueX;
                        }*/
                      //}

                    } else {
                      this[controls[j].x.param] = valueX;

                      //console.log(this[controls[j].x.param],valueX, this._insKickoutTime, this._insBarOffset0);

                      if (controls[j].y) {
                        this[controls[j].y.param] = valueY;
                      }     
                    }    

                    break;                    
                }   
                /*
                // send value to synthInstance object // channel
                //controls[j].x.value = data.x;
                console.log('ctrl block');
                window[synthInstance2]['controls'][j].x.value = valueX;
                //console.log('controls[j].x.value', controls[j].x.value);
                console.log('controls[j].x.value', window[synthInstance2]['controls'][j].x.value);
                */
              }
            }         
          } 
        }
        //window[synthInstance2]['controls'][0].x.value = 44;
        //console.log(synthInstance2+' obj AFTER change: ', window[synthInstance2]['controls']);

        /*
        var fxConfig = effectsConfig[data.id];
        paramX = fxConfig.x.param;
        paramY = fxConfig.y.param;

        if (paramX=='_tempo' || paramX=='_Ins01Volume') { // hardcoded condition
          valueX = data.x;

        } else {
          valueX = this.interpolate(data.x, fxConfig.x.min, fxConfig.x.max);
        }
        valueY = this.interpolate(data.y, fxConfig.y.min, fxConfig.y.max);
        this[paramX] = valueX;
        this[paramY] = valueY;

        console.log('update', paramX, ':', valueX);
        console.log('update', paramY, ':', valueY);
        */

        //this.setFxValues();
        //this.createInstruments(); // Update general instruments' object = crashes general audio       
    };


    this.updateSeqVariables = function(varName, varValue) { 
      this[varName] = varValue;
    };   

    this.interpolate = function(value, minimum, maximum) {
        return minimum + (maximum - minimum) * value;
    }

  

    this.initialize();
  };

}());


